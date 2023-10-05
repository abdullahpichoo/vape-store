const mockProducts = [
 {
   name: "Sample Product 1",
   description: "This is a sample product description.",
   price: 19.99,
   images: [
     {
       public_id: "image1",
       url: "https://example.com/image1.jpg",
     },
     {
       public_id: "image2",
       url: "https://example.com/image2.jpg",
     },
   ],
   category: "Electronics",
   brand: "Sample Brand 1",
   rating: 4.5,
   reviews: [
     {
       rating: 5,
       comment: "Great product!",
     },
     {
       rating: 4,
       comment: "Good value for money.",
     },
   ],
   countInStock: 10,
 },
 {
   name: "Sample Product 2",
   description: "Another sample product description.",
   price: 29.99,
   images: [
     {
       public_id: "image3",
       url: "https://example.com/image3.jpg",
     },
   ],
   category: "Clothing",
   brand: "Sample Brand 2",
   rating: 4.0,
   reviews: [
     {
       rating: 3,
       comment: "Average product.",
     },
   ],
   countInStock: 5,
 },
 // Add more mock products as needed
];

export default mockProducts;
