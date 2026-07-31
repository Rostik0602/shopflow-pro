import express from "express";
import bcrypt from "bcrypt";
import { readData } from "../utils/db";
import { generateToken } from "../utils/jwt";

const router = express.Router();

interface User {
  id: number;
  username: string;
  passwordHash: string;
}

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const data = readData<{ users: User[] }>("users.json");
  const user = data.users.find((u) => u.username === username);

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.json({
    id: user.id,
    username: user.username,
    accessToken: token,
  });
});

export default router;
