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
    rating: {
      type: Number,
      required: [true, "Please provide a rating for this product."],
    },
    reviews: [
      {
        rating: {
          type: Number,
          required: [true, "Please provide a rating for this product."],
        },
        comment: {
          type: String,
          required: [true, "Please provide a comment for this product."],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    countInStock: {
      type: Number,
      required: [true, "Please provide a count in stock for this product."],
    },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
