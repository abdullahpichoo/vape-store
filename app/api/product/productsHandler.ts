import { NextRequest, NextResponse } from "next/server";

// pages/api/products.js
import {
 createProduct,
 getAllProducts,
 getProductById,
 updateProduct,
 deleteProduct,
} from '../../../helpers/products';

export default async function productHandler(req:NextRequest, res:NextResponse) {
 const { method } = req
console.log("product handler working")
console.log(method)

// Access the request body
  const requestBody = await req.json();
  console.log(requestBody);


 switch (method) {
  case 'GET':
   try {
    const products = await getAllProducts();
    NextResponse.json({products}, {status:200});
   } catch (error) {
    NextResponse.json({ error: 'Internal server error' }, {status:500});
    // res.status(500).json({ error: 'Internal server error' });
   }
   break;

  case 'POST':
   try {
    // console.log(req.body.name)
    const product = await createProduct(requestBody);

    NextResponse.json({message:"Product added"}, {status:201});
    // res.status(201).json(product);
   } catch (error) {
    NextResponse.json({ error: 'server crash' }, {status:500});
    // res.status(500).json({ error: 'Internal server error' });
   }
   break;

  case 'PUT':
   try {
    const { id } = requestBody.id;
    const product = await updateProduct(id, requestBody);
    NextResponse.json({message:"Product updated"}, {status:200});
   } catch (error) {
    NextResponse.json({ error: 'Internal server error' }, {status:500});
   }
   break;

  case 'DELETE':
   try {
    const { id } = requestBody.id;
    await deleteProduct(id);
    NextResponse.json({message:"Product deleted"}, {status:204});
   } catch (error) {
    NextResponse.json({ error: 'Internal server error' }, {status:500});
   }
   break;

  default:
    NextResponse.json({}, {status:405});
   break;
 }
}
