import mongoose from 'mongoose'

const userCompanySchema = new mongoose.Schema({
    email:String
})


export default mongoose.models.user || mongoose.model("user", userCompanySchema)