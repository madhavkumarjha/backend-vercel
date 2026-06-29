// utils/duplicateUser.js
import User from "../models/user.model.js";

export async function ensureUniqueUser({ email, username }) {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error; // controller will catch this
  }
}
