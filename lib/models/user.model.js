import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  alias: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  spaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
