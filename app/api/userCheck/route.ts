import { NextApiRequest, NextApiResponse } from 'next';
import userCompany from '../../utils/models/userModel';

const userCheck = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { email } = req.body;

            res.status(200).json(email);
        }
    } catch (error) {}
};

export default {
    post: userCheck,
};
