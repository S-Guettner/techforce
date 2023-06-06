import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName:String,
    email:String
})


export const userModel = mongoose.model('userData', userSchema)

