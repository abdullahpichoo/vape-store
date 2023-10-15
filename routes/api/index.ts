const base_url = process.env.BASE_URL || "http://localhost:3000";

// Products
export const updateProductApiRoute = (productId: string) =>
  `${base_url}/api/products/${productId}`;
export const deleteProductApiRoute = (productId: string) =>
  `${base_url}/api/products/${productId}`;
export const addProductApiRoute = `${base_url}/api/products/new`;
export const productsApiRoute = `${base_url}/api/products`;

// Users
export const usersApiRoute = `${base_url}/api/admin/users`;
