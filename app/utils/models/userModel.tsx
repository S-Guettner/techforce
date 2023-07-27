import mongoose from 'mongoose'


const application = new mongoose.Schema({

    firstName: String,
    lastName: String,
    telephoneNumber: String,
    emailAdress: String,
    cvPath:String,
    location:String,
    salaryExpectation:String
})

const jobPostings = new mongoose.Schema({

    jobTitle: String,
    shortJobDescription: String,
    detailedJobDescription: String,
    tasks: [String],
    offers: [String],
    requirements: [String],
    contactPersonName: String,
    contactPersonNumber: String,
    contactPersonEmail: String,
    applications: [application],

    timestamp: {
        type: Date,
        immutable: true,
        default: Date.now,
    },

})

const userSchema = new mongoose.Schema({

    email: String,
    userType: String,
    jobPostings: [jobPostings]
})




export default mongoose.models.user || mongoose.model("user", userSchema)