import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: [true, "Activity name is required"],
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"]
    },
    currency: {
      type: String,
      default: "EUR"
    },
    date: {
      type: Date
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 1000
    }
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
export default Activity;