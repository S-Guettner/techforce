import mongoose from 'mongoose'


const application = new mongoose.Schema({

    firstName: String,
    lastName: String,
    telephoneNumber: String,
    emailAdress: String,
    cvPath: String,
    location: String,
    salaryExpectation: String,
    message: String,
    originJobPosting: mongoose.Schema.Types.ObjectId,
})

const companyDetails = new mongoose.Schema({
    companyName:String,
    companyImage:String,
    companyLocation:String,
    yearFounded:String,
    numberOfEmployees:String,

})


const jobPostings = new mongoose.Schema({

    jobTitle: String,
    detailedJobDescription: String,
    tasks: [String],
    offers: [String],
    requirements: [String],
    contactPersonName: String,
    contactPersonNumber: String,
    contactPersonEmail: String,
    location: String,
    latitude:Number,
    longitude:Number,
    applications: [application],
    favoriteApplications: {
        type: [application],
        default: []
    },


    timestamp: {
        type: Date,
        immutable: true,
        default: Date.now,
    },

})


const userSchema = new mongoose.Schema({

    email: String,
    password:String,
    userType: String,
    jobPostings: [jobPostings],
    companyDetails: companyDetails ,

})




export default mongoose.models.user || mongoose.model("user", userSchema)