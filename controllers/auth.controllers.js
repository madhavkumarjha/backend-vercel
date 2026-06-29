import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import crypto from "crypto";
// import { sendOTPEmail } from "../utils/nodemailer.utils.js";
import bcrypt from "bcrypt";
import { ensureUniqueUser } from "../utils/duplicateUser.js";
import { generateToken } from "../utils/token.js";
import { asyncHandler } from "../utils/asyncHandlerAndError.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, name } = req.body;
  await ensureUniqueUser(username, email);
  const user = new User({ username, email, password, name });
  await user.save();

  await generateToken(user._id);
  res
    .status(201)
    .json({ success: true, message: "User registered successfully", user });
});

