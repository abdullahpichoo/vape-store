import { Schema, model, models } from "mongoose";

const CartSchema = new Schema({
  //referencing the user model
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
});

const Cart = models.Cart || model("Cart", CartSchema);

export default Cart;
