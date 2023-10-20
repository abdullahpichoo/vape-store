import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this product."],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this product."],
    },
    discountPrice: {
      type: Number,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please provide a category for this product."],
    },
    brand: {
      type: String,
      required: [true, "Please provide a brand for this product."],
    },
    countInStock: {
      type: Number,
      required: [true, "Please provide a count in stock for this product."],
    },
    rating: {
      type: Number,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    sales: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
