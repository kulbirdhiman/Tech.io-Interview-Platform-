import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: String,
    name: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
