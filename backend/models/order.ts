import { Schema, model, models } from "mongoose";

enum OrderStatus {
  ORDERED = "ORDERED",
  PROCESSING = "PROCESSING",
  DELIVERED = "DELIVERED",
}

const OrderSchema = new Schema(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      email: {
        type: String,
        required: true,
      },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        productImage: {
          type: String,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
        },
        productBrand: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.ORDERED,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;
