import express from "express"
import cors from "cors";
import mysql from "mysql";
import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} from "@aws-sdk/client-s3";
import multer from "multer";
import crypto from "crypto";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const app = express();

app.use(express.json())
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

const db = mysql.createConnection({
    host: "ddac.c0keakeayjci.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin12345",
    database: "ddac"
})

const s3 = new S3Client({
    credentials: {
        accessKeyId: 'ASIAVN2QEUHZRKX23SDS',
        secretAccessKey: 'SC1RdSGH2SgGc4zHSkEEZdwIEDoHja19dvNJtiOA',
        sessionToken: 'FwoGZXIvYXdzEIf//////////wEaDDfIDSYutdytQQUSIiLJAejlpGWD4xjPbr0HS/ct8RCcgAUKOo+NKxvd2k5cYJFbRS51iDxg0XcjeCApxISH2hMWAGMvoJvP1o0gCyjwvipaMKQx6a2qYsoZyWof0P1CoTKpFOiACP6CcxKZQaXZ78F68gMSL+ssx4k6pv8zwL7PoilMKNAK9vmIDwg4QIDn73kyNO9HJ5EGCIdK15NuuPrWQzSznsh5QTZy3AulykDezxWshCPJJFyirGX5ixbgwqdWKGWpwEaW/hKJtuot8E7SWqthga5vNCikzoOeBjItux0fhevA9B48ROT/DypGHIxhXsGoKvmc+UDW9Q6/WteQtFYC7dTx9QEh23KN'
    },
    region: 'us-east-1'
})

const users = [
    {
        userID: 'jaden',
        password: 'passwd',
        contactNo: '01010'
    },{
        userID: 'john',
        password: 'passwd',
    }
]

function generateSKU() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sku = '';

    for (let i = 0; i < 8; i++) {
        sku += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return sku;
}


// ROUTES: app.get, app.post, app.put, etc.
app.get('/images', (req, res) => {
    const q = "SELECT * FROM ProductDetail pd INNER JOIN Product p ON pd.product_id = p.product_id ORDER BY pd.id DESC";
    db.query(q, async (err, data) => {
        if(err) return res.json(err);
        for(let item of data) {
            const getObjectParams = {
                Bucket: 'ddac-s3',
                Key: item.image_name
            }
            const command = new GetObjectCommand(getObjectParams);
            item['url'] = await getSignedUrl(s3, command, {expiresIn: 3600})  //expiry in seconds
        }
        console.log(data)
        return res.json(data)
    })
})

app.post('/login',(req, res)=>{
    console.log('post request received')
    console.log(req.body.username)
    console.log(req.body.password)
    console.log()
    let user, result;
    if(user = users.find(user => user.userID === req.body.username)){
        if (user.password === req.body.password){
            result = {
                status: 'logged in',
                user: user,
            }
        }else{
            result = {status: 'wrong password'}
        }
    }else{
        result = {status: 'user not found'}
    }
    res.send(result)
})

app.post('/register',(req,res)=>{

})

app.post('/add-product', (req, res) => {
    // const {name} = req.body;
    const SKU = generateSKU();
    // console.log(req.body.name, SKU)
    const q = "INSERT INTO Product SET `merchant_id` = 1, `name` = ?, `description` = 'test', `SKU` = ?, `category_id` = 1, `brand` = 'Cadbury', `price` = 1.23, `quantity` = 10"
    const values = [req.body.name, SKU];
    db.query(q, values, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/upload-img', upload.array('images', 10), async (req, res) => {
    // console.log(req.files)
    // console.log(req.body.id)
    let images = [];
    for (let file of req.files) {
        const buffer = await sharp(file.buffer).resize({height: 1080, width: 1080, fit: "contain"}).toBuffer()
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
    db.query(q, [images.map(imgName => [req.body.id, imgName])], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.delete('/images/:id', async(req, res) => {
    const id = req.params.id;
    const q = "SELECT * FROM ProductDetail pd WHERE pd.id = ?"
    db.query(q, [[id]], async (err, data) => {
        if(err) return res.json(err);
        if(data.length !== 0) {
            const params = {
                Bucket: 'ddac-s3',
                Key: data[0].image_name
            }
            const command = new DeleteObjectCommand(params);
            await s3.send(command);

            db.query("DELETE FROM ProductDetail pd WHERE pd.id = ?", [[id]], (err, data) => {
                if(err) return res.json(err);
                return res.json(data);
            })
        }
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})