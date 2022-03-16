import express from "express";
var cors = require('cors') /*SERVE PER COLLEGARE NODE AD ANGULAR*/

const app = express();
const port=3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors()) //si utilizza così

app.get('/example',(req, res) => {
    res.json({message:"HI I AM AN EXAMPLE GET REQUEST"})
})
app.listen(port,()=>console.log("Project Work Server Is Running, port: " + port));