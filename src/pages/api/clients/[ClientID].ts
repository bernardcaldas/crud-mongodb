// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../services/db";
import Client from '../../../models/Clients';

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { ClientID } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const { name, email, department } = req.body;
        if (!name && !email) throw 'Invalid data';
        const client = await Client.findByIdAndUpdate(ClientID, {name, email, department}, {new: true})
        res.status(200).json({ success: true, data: client})
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
            }
        break;
      
    

    case 'DELETE':
      try {
        await Client.deleteOne({id: ClientID})
        res.status(200).json({ success: true, data: {}})
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error })
        }
    break;
  }
}