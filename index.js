const express = require('express')
const mongoose = require('mongoose');
const appp=require('./app')
const app=express();
mongoose.connect('mongodb://localhost:27017/REST_APIS').then(()=>
  console.log("mongoDB connected")
).catch((err)=> console.log(err))
app.use(appp)
app.listen(4000,()=> console.log("server is running................."))