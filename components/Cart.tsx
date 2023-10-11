// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export const getCart = async () => {
//   const session = await getServerSession(authOptions);
//   console.log("Cart Session", session);

//   const url = `${process.env.LOCAL_BASE_URL}/api/cart/${session?.user?.id}`;
//   console.log("Cart URL", url);

//   const cart = await fetch(
//     `${process.env.LOCAL_BASE_URL}/api/cart/${session?.user?.id}`,
//     {
//       method: "GET",
//     }
//   );
//   return await cart.json();
// };

// const Cart = async () => {
//   const cart = await getCart();
//   return <div>Cart</div>;
// };

// export default Cart;
