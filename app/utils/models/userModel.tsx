import mongoose from 'mongoose'

const jobPostings = new mongoose.Schema({
    jobTitle:String,
    shortJobDescription:String,
    detailedJobDescription:String,
    tasks:[String],
    offers:[String],
    requirements:[String],
    contactPerson:String,
    timestamp: {
        type: Date,
        immutable: true,
        default: Date.now,
    },

})

const userSchema = new mongoose.Schema({
    email:String,
    userType:String,
    jobPostings: [jobPostings]
})


export default mongoose.models.user || mongoose.model("user", userSchema)