import express from "express"
import cors from "cors";
import mysql from "mysql";

const app = express();

app.use(express.json())
app.use(cors());

const db = mysql.createConnection({
    host: "ddac.c0keakeayjci.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "admin12345",
    database: "ddac"
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

// app.get('/users', (req, res) => {
//     const q = "SELECT * FROM user";
//     db.query(q, (err, data) => {
//         if(err) return res.json(err);
//         return res.json(data);
//     })
// })

// ROUTES: app.get, app.post, app.put, etc.
app.post('/login',(req, res)=>{
    console.log('post request received')
    console.log(req.body.username)
    console.log(req.body.password)
    console.log()
    var user, result;
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

app.listen(8800, () => {
    console.log("Connected to backend!")
})