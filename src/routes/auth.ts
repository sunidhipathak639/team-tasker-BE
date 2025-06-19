import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
