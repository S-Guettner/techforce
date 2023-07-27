import mongoose from 'mongoose'

let isConnected = false

const connectionToDB = async () => {
    

    if (isConnected) {
        console.log("DB is connected")
        return
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL as string , {
            dbName: "techforce",
        })
        isConnected = true
    } catch (err) {
        console.log(err)
    }
}



export default connectionToDB