import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../server.js";
import { validationResult } from "express-validator";

const SECRET = "brian";

const register = async (req, res) => {
  // receive validation result and then check
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({ errorValidation: errorValidation.array() });
  }

  const { username, password, email, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "insert into users (username, password, email, address) values (?, ?, ?, ?)";
    const [result] = await db.query(sql, [
      username,
      hashedPassword,
      email,
      address,
    ]);
    res
      .status(201)
      .json({ message: "User registered successfully", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sql = "select * from users where email = ?";
    const [results] = await db.query(sql, [email]);
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET,
      {
        expiresIn: "10h",
      }
    );
    return res.json({ message: "login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid email or password" });
  }
};

export { register, login };
