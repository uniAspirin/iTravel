import { db } from "../server.js";
import { validationResult } from "express-validator";

const getAllUsers = async (req, res) => {
  try {
    const [results] = await db.query("select * from users");
    res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error getting all users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query("select * from users where id = ?", [id]);
    res.json(results[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error getting single user" });
  }
};

const createUser = async (req, res) => {
  const { username, password, email, address } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO users (username, password, email, address) VALUES (?, ?, ?, ?)",
      [username, password, email, address]
    );
    return res.json({
      message: "User added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error creating user" });
  }
};

const updateUser = async (req, res) => {
  // receive validation result and then check
  const errorValidation = validationResult(req);
  if (!errorValidation.isEmpty()) {
    return res.status(400).json({ errorValidation: errorValidation.array() });
  }

  const { id } = req.params;
  const { username, password, email, address } = req.body;

  try {
    await db.query(
      "UPDATE users SET username = ?, password = ?, email = ?, address = ? WHERE id = ?",
      [username, password, email, address, id]
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
