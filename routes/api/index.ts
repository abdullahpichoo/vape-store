export const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

// Products
export const updateProductApiRoute = (productId: string) =>
  `${baseUrl}/api/products/${productId}`;
export const deleteProductApiRoute = (productId: string) =>
  `${baseUrl}/api/products/${productId}`;
export const addProductApiRoute = `${baseUrl}/api/products/new`;
export const productsApiRoute = `${baseUrl}/api/products`;

// Users
export const usersApiRoute = `${baseUrl}/api/admin/users`;
export const addUserApiRoute = `${baseUrl}/api/admin/users/new`;
export const updateUserApiRoute = (userId: string) =>
  `${baseUrl}/api/admin/users/${userId}`;
export const deleteUserApiRoute = (userId: string) =>
  `${baseUrl}/api/admin/users/${userId}`;
