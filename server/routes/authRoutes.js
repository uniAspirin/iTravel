import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),

    body("email").isEmail().withMessage("Email must be valid"),

    body("address")
      .notEmpty()
      .withMessage("Address is required")
      .isString()
      .withMessage("Address must be a string"),
  ],
  register
);
authRouter.post("/login", login);

export { authRouter };
