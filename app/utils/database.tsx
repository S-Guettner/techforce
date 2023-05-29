import mongoose from 'mongoose'

let isConnected = false

export const connectionToDB = async () => {
    mongoose.set('strictQuery', true)

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