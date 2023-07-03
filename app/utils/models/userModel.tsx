import mongoose from 'mongoose'

const jobPostings = new mongoose.Schema({
    jobTitle:String,
    shortJobDescription:String,
    detailedJobDescription:String,
    contactPerson:String
})

const userCompanySchema = new mongoose.Schema({
    email:String,
    post: jobPostings
})


export default mongoose.models.user || mongoose.model("user", userCompanySchema)