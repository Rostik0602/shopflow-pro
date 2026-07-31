import express from "express";
import bcrypt from "bcrypt";
import { readData, writeData } from "../utils/db";
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

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const data = readData<{ users: User[] }>("users.json");

  if (data.users.some((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = { id: Date.now(), username, passwordHash };

  writeData("users.json", { users: [...data.users, newUser] });

  const token = generateToken(newUser.id);

  res.json({
    id: newUser.id,
    username: newUser.username,
    accessToken: token,
  });
});

export default router;
