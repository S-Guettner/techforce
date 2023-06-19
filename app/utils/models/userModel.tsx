import mongoose from 'mongoose'

const userCompanySchema = new mongoose.Schema({
    userName:String,
    email:String
})


const userCompany = mongoose.model('userCompany', userCompanySchema)

export default userCompany