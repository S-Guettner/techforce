import { NextApiRequest,NextApiResponse } from "next"
import userModel from "../../utils/models/userModel"

const userCheck = async (req:NextApiRequest, res:NextApiResponse) => {
    const {email} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        await userModel.create({email})
    }
    const response =  user ?  "user found" : "user not found"
    res.status(200).json(response);
}

export default userCheck;