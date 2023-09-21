import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req:NextApiRequest, res:NextApiResponse){
  //call productHandler and pass req and res
  console.log(req.body);

  return NextResponse.json({message:'hello'}, {status:200});

}