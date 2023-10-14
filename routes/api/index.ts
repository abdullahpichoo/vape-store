const base_url = process.env.LOCAL_BASE_URL || "http://localhost:3000";

// Products
export const updateProductApiRoute = (productId: string) =>
  `${base_url}/api/products/${productId}`;
