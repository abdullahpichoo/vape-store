import { NextApiRequest, NextApiResponse } from 'next';
import productHandler from '../productsHandler'

export async function POST(req:NextApiRequest, res:NextApiResponse){
  //call productHandler and pass req and res
  productHandler(req, res);
}