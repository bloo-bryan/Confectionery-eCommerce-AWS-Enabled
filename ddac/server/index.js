import express from "express"
import cors from "cors";
import mysql from "mysql";
import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Stripe from 'stripe';
import path from 'path';
import { sendMessage } from "./sqs-send.js";
import AWSXRay from 'aws-xray-sdk';

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../client/build")

const app = express();

app.use(AWSXRay.express.openSegment('MyApp'));
app.use(express.static(buildPath))
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const stripe = new Stripe('sk_test_51MReqiBcfCWP6dm5BP6Unr0FS4kOwdvXQaLgOsqVaEbKY8maj6DMrbBNOkWFdecfr6uRfIPF2Ke3M738BIoS62fb00eZsEXU7p');

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const db = mysql.createConnection({
    host: "ddac.c0keakeayjci.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin12345",
    database: "ddac"
})

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.aws_access_key_id,
        secretAccessKey: process.env.aws_secret_access_key,
        sessionToken: process.env.aws_session_token
    },
    region: 'us-east-1'
})


// ROUTES: app.get, app.post, app.put, etc.
app.get('/product-images/:pid', (req, res) => {
    const productId = req.params.pid;
    const q = "SELECT * FROM ProductDetail pd WHERE pd.product_id = ?";
    db.query(q, [[productId]], async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image_name
            }
            const command = new GetObjectCommand(getObjectParams);
            item['url'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        return res.json(data)
    })
})

// get all products under current merchant ID
app.get('/all-products/:mid', (req, res) => {
    const merchantId = req.params.mid;
    const q = "SELECT p.product_id, p.merchant_id, p.name, p.description, p.SKU, p.brand, p.price, p.quantity, CONVERT_TZ(p.created_at, 'UTC', '+08:00') AS created_at, p.category, GROUP_CONCAT(pd.image_name) AS image from Product p INNER JOIN ProductDetail pd ON p.product_id = pd.product_id WHERE p.merchant_id = ? GROUP BY p.product_id";
    db.query(q, [[merchantId]], async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image.split(',')[0]
            }
            const command = new GetObjectCommand(getObjectParams);
            item['image'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        return res.json(data);
    })
})

app.get('/single-product/:pid', (req, res) => {
    const productId = req.params.pid;
    const q = "SELECT p.product_id, p.merchant_id, md.name AS 'merchant_name', p.name, p.description, p.SKU, p.brand, p.price, p.quantity, p.category FROM Product p INNER JOIN MerchantDetail md ON p.merchant_id = md.merchant_id WHERE p.product_id = ?";
    db.query(q, [[productId]], async (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/all-orders/:mid', (req, res) => {
    const merchantId = req.params.mid;
    const q = "SELECT o.order_id, u.username, cd.name, o.total, o.shipping, CONVERT_TZ(o.created_at, 'UTC', '+08:00') AS dateAdded, o.status FROM `User` u INNER JOIN CustomerDetail cd ON u.user_id = cd.user_id INNER JOIN `Order` o ON cd.customer_id = o.customer_id WHERE o.merchant_id = ?"
    db.query(q, [[merchantId]], async (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/all-products', (req, res) => {
    const q = "SELECT p.product_id, p.merchant_id, p.name, p.description, p.SKU, p.brand, p.price, p.quantity, CONVERT_TZ(p.created_at, 'UTC', '+08:00') AS created_at, p.category, GROUP_CONCAT(pd.image_name) AS image from Product p INNER JOIN ProductDetail pd ON p.product_id = pd.product_id GROUP BY p.product_id";
    db.query(q, async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image.split(',')[0]
            }
            const command = new GetObjectCommand(getObjectParams);
            item['image'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        return res.json(data);
    })
})

app.get('/featured-products', (req, res) => {
    const q = "SELECT p.*, top_products.total_quantity, GROUP_CONCAT(pd.image_name) AS image FROM Product p JOIN (SELECT product_id, SUM(quantity) as total_quantity FROM OrderDetail GROUP BY product_id ORDER BY total_quantity DESC LIMIT 3) as top_products ON p.product_id = top_products.product_id JOIN ProductDetail pd ON p.product_id = pd.product_id GROUP BY top_products.product_id"
    db.query(q, async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image.split(',')[0]
            }
            const command = new GetObjectCommand(getObjectParams);
            item['image'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        return res.json(data);
    })
})

app.get('/single-order/:oid', (req, res) => {
    const orderId = req.params.oid;
    const q = "SELECT u.username, cd.name AS custName, cd.shipping AS address, cd.state, o.order_id, o.total, o.shipping, CONVERT_TZ(o.created_at, 'UTC', '+08:00') AS dateAdded, o.status, p.SKU, p.name, p.price, od.quantity, MIN(pd.image_name) AS image_name FROM `Order` o INNER JOIN CustomerDetail cd ON o.customer_id = cd.customer_id INNER JOIN `User` u ON u.user_id = cd.user_id INNER JOIN OrderDetail od ON o.order_id = od.order_id INNER JOIN Product p ON od.product_id = p.product_id INNER JOIN ProductDetail pd ON od.product_id = pd.product_id WHERE o.order_id = ? GROUP BY od.product_id"
    db.query(q, [[orderId]], async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image_name
            }
            const command = new GetObjectCommand(getObjectParams);
            item['url'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        return res.json(data)
    })
})


app.post('/login',(req, res)=>{
    console.log('Login requested');
    const q = 'SELECT * FROM User WHERE username = ?';
    const username = [req.body.username];
    db.query(q, username, (err, data) => {
        if(err) return res.json(err);
        if(data[0]){
            if(data[0].password != req.body.password) return res.send({status: 'wrong password'});
            const role = data[0].role;
            let userQuery, result;
            switch (role){
                case 'customer':
                    userQuery = 'SELECT * FROM CustomerDetail cd INNER JOIN User u ON cd.user_id = u.user_id WHERE username = ?'
                    db.query(userQuery, username, (err,data) =>{
                        if(err) return res.json(err);
                        result = {
                            status: 'logged in',
                            id: data[0].user_id,
                            username: username[0],
                            name: data[0].name,
                            role: role,
                            mobile: data[0].mobile,
                            shipping: data[0].shipping,
                            state: data[0].state,
                        }
                        return res.send(result);
                    })
                    break;
                case 'merchant': 
                    userQuery = 'SELECT * FROM MerchantDetail md INNER JOIN User u ON md.user_id = u.user_id WHERE username = ?'
                    db.query(userQuery, username, (err,data) =>{
                        if(err) return res.json(err);
                        result = {
                            status: 'logged in',
                            id: data[0].user_id,
                            username: username[0],
                            name: data[0].name,
                            role: role,
                            mobile: data[0].mobile,
                        }
                        return res.send(result);
                    })
                    break;
            }
        }else{
            return res.send({status: 'user not found'});
        }
    })
})

app.post('/checkUsername', (req,res)=>{
    const { username } = req.body;
    const checkName = "SELECT * FROM ddac.User WHERE username = ?";
    db.query(checkName, username,(err, data)=>{
        if(err) return res.json(err);
        if(data[0] != null){
            return res.send({status: 'invalid'});
        }else{
            return res.send({status: 'valid'});
        }
    })
})

app.post('/checkEmail', (req, res) => {
    const { email, role } = req.body;
    let chkEmail = null;
    if (role === 'customer') {
        chkEmail = "select * from ddac.CustomerDetail where email = ?"
    } else if (role === 'merchant') {
        chkEmail = "select * from ddac.MerchantDetail where email = ?"
    }
    db.query(chkEmail, email, (err, data) => {
        if (err) return res.json(err);
        if (data[0] != null) {
            return res.send({ status: 'invalid' });
        } else {
            return res.send({ status: 'valid' });
        }
    })
})

app.post('/register', (req,res)=>{
    console.log(req.body)
    const { username, password, role, mobile, email } = req.body;
    const insertUser = "INSERT INTO ddac.User SET username = ?, password = ?, role = ?";
    const userData = [username, password, role];
    db.query(insertUser, userData, (err, result) => {
        if(err) return res.json(err);
        const user_id = result.insertId;
        let affectedRow = result.affectedRows;
        let insertRole, roleData;
        switch (role){
            case 'customer':
                insertRole = "INSERT INTO ddac.CustomerDetail SET user_id = ?, name = ?, mobile = ?, shipping = ?, state = ?, email = ?";
                const { shipping, state } = req.body;
                roleData = [ user_id, username, mobile, shipping, state, email];
                break;
            case 'merchant':
                insertRole = "INSERT INTO ddac.MerchantDetail SET user_id = ?, name = ?, mobile = ?, email = ?";
                roleData = [ user_id, username, mobile, email];
                break;
        }
        db.query(insertRole, roleData, async (err, result) => {
        if(err) return res.json(err);
        affectedRow += result.affectedRows;

        try {
            const emailBody = {
                to: email,
                subject: 'DDAC Registration',
                text: `Hi ${username}, your DDAC ${role} account succesfully registered`,
                html: `
                    <p>Hi <b>${username}</b>, your DDAC ${role} account succesfully registered, here is your detail account</p>
                    <table>
                    <tr>
                        <td><strong>Username</strong></td>
                        <td>${username}</td>
                    </tr>
                    <tr>
                        <td><strong>Mobile</strong></td>
                        <td>${mobile}</td>
                    </tr>
                    <tr>
                        <td><strong>Email</strong></td>
                        <td>${email}</td>
                    </tr>
                    </table>
                `
            }
            const data = await sendMessage(JSON.stringify(emailBody))
            console.log(data)
        } catch (err) {
            console.log(err)
        }

        return res.send({status: 'done', affectedRows: affectedRow});
        })
    })
})

app.post('/add-product', (req, res) => {
    // const {name} = req.body;
    // console.log(req.body.name, SKU)
    const {merchant_id, name, description, SKU, brand, price, quantity, category} = req.body;
    const q = "INSERT INTO Product SET `merchant_id` = ?, `name` = ?, `description` = ?, `SKU` = ?, `category` = ?, `brand` = ?, `price` = ?, `quantity` = ?"
    const values = [merchant_id, name, description, SKU, category, brand, price, quantity];
    db.query(q, values, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/upload-img', upload.array('images', 10), async (req, res) => {
    console.log(req.files)
    console.log(req.body.pid)
    let images = [];
    for (let file of req.files) {
        const buffer = await sharp(file.buffer).resize({height: 1080, width: 1080, fit: "cover"}).toBuffer()
        const imageName = randomImageName();
        const params = {
            Bucket: 'ddac-s3',
            Key: imageName,
            Body: buffer,
            ContentType: file.mimetype
        }
        images.push(imageName);
        const command = new PutObjectCommand(params)
        await s3.send(command);
    }
    const q = "INSERT INTO ProductDetail (product_id, image_name) VALUES ?";
    db.query(q, [images.map(imgName => [req.body.pid, imgName])], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/payment', cors(), async(req, res) => {
    let {cart, shipping_fee, total_amount} = req.body;
    console.log(req.body)
    try {
        const payment = await stripe.paymentIntents.create({
            amount: (shipping_fee + total_amount).toFixed(2) * 100,
            currency: "MYR",
        })
        // console.log("Payment", payment)
        res.json({
            message: "Payment successful",
            success: true,
            clientSecret: payment.client_secret
        })
    } catch(error) {
        console.log("Error", error)
        res.json({
            message: "Payment failed",
            success: false
        })
    }
})

app.delete('/images/:id', async(req, res) => {
    const imageId = req.params.id;
    const q = "SELECT * FROM ProductDetail pd WHERE pd.id = ?"
    db.query(q, [[imageId]], async (err, data) => {
        if(err) return res.json(err);
        if(data.length !== 0) {
            const params = {
                Bucket: 'ddac-s3',
                Key: data[0].image_name
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);

            db.query("DELETE FROM ProductDetail pd WHERE pd.id = ?", [[imageId]], (err, data) => {
                if(err) return res.json(err);
                return res.json(data);
            })
        }
    })
})

app.delete('/remove-product/:pid', async(req, res) => {
    const productId = req.params.pid;
    const q = "SELECT * FROM ProductDetail pd WHERE pd.product_id = ?"
    db.query(q, [[productId]], async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const params = {
                Bucket: 'ddac-s3',
                Key: item.image_name
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);

            db.query("DELETE FROM ProductDetail pd WHERE pd.product_id = ?", [[productId]], (err, data1) => {
                if(err) return res.json(err);
                db.query("DELETE FROM Product p WHERE p.product_id = ?", [[productId]], (err, data2) => {
                    if(err) return res.json(err);
                })
            })
        }
        return res.json(data);
    })
})

app.put('/update-product/:id', (req, res) => {
    const pid = req.params.id;
    const {merchant_id, name, description, SKU, brand, price, quantity, category} = req.body;
    const q = "UPDATE Product SET `merchant_id` = ?, `name` = ?, `description` = ?, `SKU` = ?, `category` = ?, `brand` = ?, `price` = ?, `quantity` = ? WHERE `product_id` = ?"
    db.query(q, [merchant_id, name, description, SKU, category, brand, price, quantity, pid], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put('/update-status/:oid', (req, res) => {
    const orderId = req.params.oid;
    const {status} = req.body;
    const q = "UPDATE `Order` SET `status` = ? WHERE `order_id` = ?"
    db.query(q, [status, orderId], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.put('/update-quantity/:pid', (req, res) => {
    const productId = req.params.pid;
    const {quantity} = req.body;
    const q = "UPDATE `Product` SET `quantity` = `quantity` - ? WHERE `product_id` = ?"
    db.query(q, [quantity, productId], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/sendsqsmsg', async (req, res) => {
    const data = await sendMessage(JSON.stringify(req.body))
    return res.json(data)
})

app.get("/", function(req, res) {
    res.render('index');
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function(err) {
            if(err) {
                res.status(500).send(err);
            }
        }
    )
})

app.use(AWSXRay.express.closeSegment());

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MYSQL")
})

app.listen(8800, () => {
    console.log("Connected to backend! Port ", 8800)
})