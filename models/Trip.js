import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    },
    budget: {
      type: Number,
      min: [0, "Budget cannot be negative"]
    }
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;