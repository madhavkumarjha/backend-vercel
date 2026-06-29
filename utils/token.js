import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function generateToken(userId) {
  return jwt.sign(
    { id: userId }, 
    config.jwtSecret, 
    { expiresIn: "2d" } // configurable expiry
  );
}
