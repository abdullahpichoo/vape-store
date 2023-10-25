export const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

// Products
export const updateProductApiRoute = (productId: string) =>
  `${baseUrl}/api/products/${productId}`;
export const deleteProductApiRoute = (productId: string) =>
  `${baseUrl}/api/products/${productId}`;
export const addProductApiRoute = `${baseUrl}/api/products/new`;
export const productsApiRoute = `${baseUrl}/api/products`;
export const bestSellingProductsApiRoute = `${baseUrl}/api/products/best-selling`;
export const featuredProductsApiRoute = `${baseUrl}/api/products/featured`;
export const productsApiRouteParams = (params: string) =>
  `${baseUrl}/api/products/${params}`;

// Users
export const usersApiRoute = `${baseUrl}/api/admin/users`;
export const addUserApiRoute = `${baseUrl}/api/admin/users/new`;
export const updateUserApiRoute = (userId: string) =>
  `${baseUrl}/api/admin/users/${userId}`;
export const deleteUserApiRoute = (userId: string) =>
  `${baseUrl}/api/admin/users/${userId}`;

// Cart
export const cartApiRoute = (userId: string) =>
  `${baseUrl}/api/profile/${userId}/cart`;
export const addToCartApiRoute = (userId: string, cartId: string) =>
  `${baseUrl}/api/profile/${userId}/cart/${cartId}/add-item`;
export const removeItemFromCartApi = (userId: string, cartId: string) =>
  `${baseUrl}/api/profile/${userId}/cart/${cartId}/delete-item`;

// Addresses
export const addressesApiRoute = (userId: string) =>
  `${baseUrl}/api/profile/${userId}/addresses`;
export const addAddressApiRoute = (userId: string) =>
  `${baseUrl}/api/profile/${userId}/addresses/new`;
export const updateAddressApiRoute = (userId: string, addressId: string) =>
  `${baseUrl}/api/profile/${userId}/addresses/${addressId}`;

// Orders
export const adminOrdersApiRoute = (params: string) =>
  `${baseUrl}/api/admin/orders${params}`;
export const adminOrdersApiRouteS = `${baseUrl}/api/admin/orders`;
export const ordersApiRoute = (userId: string) =>
  `${baseUrl}/api/profile/${userId}/orders`;
export const addOrderApiRoute = (userId: string) =>
  `${baseUrl}/api/profile/${userId}/orders/new`;
export const updateOrderApiRoute = (orderId: string) =>
  `${baseUrl}/api/admin/orders/${orderId}`;
