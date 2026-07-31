import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key-change-this";

export function generateToken(userId: number) {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET_KEY) as { userId: number };
}