const express=require('express');
const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    id: { type: String, required: true },
    login: { type: String, required: true },
    password: { type: String, required: true },
    version: { type: Number, required: true, default: 0 },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
module.exports=mongoose.model("User",UserSchema)