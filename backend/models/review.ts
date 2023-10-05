import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
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
  //referencing the user model
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  //referencing the product model
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
