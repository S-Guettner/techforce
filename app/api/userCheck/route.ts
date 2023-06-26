import { NextApiRequest, NextApiResponse } from 'next';
import userCompany from '../../utils/models/userModel';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email } = req.body;

        res.statusCode = 200;
        return res.json(email);
    } catch {
        res.statusCode = 400;
        return res.json('not working');
    }
}
