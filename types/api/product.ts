export type product = {
 name: {
  type: String
 },
 description: {
  type: String
 },
 price: {
  type: Number
 },
 images: [
  {
   public_id: {
    type: String
   },
   url: {
    type: String
   },
  }
 ],
 category: {
  type: String
 },
 brand: {
  type: String
 },
 rating: {
  type: Number
 },
 countInStock: {
  type: Number
 },
}