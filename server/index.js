require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose')
const Shoes = require('./model/shoe')
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET)


const app = express();

const PORT = 8000;

// const uri = 'mongodb+srv://ShoeStore:ShoeStore123@shoestorecluster.l8y4oey.mongodb.net/?retryWrites=true&w=majority'
const uri = "mongodb://localhost:27017/ShoeStoreDB"

mongoose.connect(uri)
mongoose.set('strictQuery', false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", ()=>{
    console.log(`Database connected`)
})

app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.json())

app.get('/home', async(req,res)=>{
    let returnData = await Shoes.find()
    returnData = returnData.splice(0,4)
    res.send(returnData)
})

app.get("/category/men", async(req,res)=>{
    const returnData = await Shoes.find({category: 'men'})
    res.send(returnData)
})

app.get("/category/women", async(req,res)=>{
    const returnData = await Shoes.find({category: 'women'})
    res.send(returnData)
})

app.get("/category/kids", async(req,res)=>{
    const returnData = await Shoes.find({category: 'kids'})
    res.send(returnData)
})

app.get('/product/:id', async(req,res)=>{
    const {id} = req.params
    const returnData = await Shoes.findOne({name: `${id}`})
    res.send(returnData)
})

app.get("/finalbill", async(req,res)=>{
    const {cart}= req.body
    console.log(cart)
})

app.post('/payments', async(req,res)=>{
    const {amount, id} = req.body
    try {
        const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'jpy',
        payment_method: id,
        confirm: true
    });
    console.log("Payment", payment)
    res.json({
        message: "Payment successful",
        success: true
    });
    } catch (error) {
        console.log("Error",error)
        res.json({
            message: "Payment Failed",
            success: false
        });
    }
})

app.use((err,req,res,next)=>{
    const {status = 500}= err;
    if(!err.message) err.message= 'Something Went Wrong'
    return res.status(status).render('error', {err})
})

app.listen(PORT, ()=>{
    console.log("Server is running on Port ",+PORT )  
})

