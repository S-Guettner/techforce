import mongoose from 'mongoose'

const userCompanySchema = new mongoose.Schema({
    userName:String,
    email:String
})

//userData = name of collection
const userCompany = mongoose.model('userCompany', userCompanySchema)

export default userCompany