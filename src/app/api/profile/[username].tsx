import { NextApiRequest, NextApiResponse } from 'next';
import {connectDB} from '@/libs/mongodb';
import User from "@/models/user";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { name },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findOne({ name });
        if (!user) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ success: true, data: user });
      } catch (error) {
        return res.status(500).json({ success: false, message: 'Error del servidor' });
      }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Método ${method} no permitido`);
  }
}