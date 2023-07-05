import mongoose from 'mongoose'

const jobPostings = new mongoose.Schema({
    jobTitle:String,
    shortJobDescription:String,
    detailedJobDescription:String,
    tasks:[String],
    offers:[String],
    requirements:[String],
    contactPerson:String
})

const userCompanySchema = new mongoose.Schema({
    email:String,
    jobPostings: [jobPostings]
})


export default mongoose.models.user || mongoose.model("user", userCompanySchema)