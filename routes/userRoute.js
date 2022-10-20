import express from "express";
import { body } from "express-validator";
import {
  createUser,
  deleteUser,
  getDashboardPage,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("please enter your name"),

    body("email")
      .isEmail()
      .withMessage("please enter valid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("E-mail already exist !!");
        }
      }),

    body("password").not().isEmpty().withMessage("please entera password"),
  ],
  createUser
);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/:id").delete(deleteUser);
router.route("/dashboard").get(authMiddleware, getDashboardPage);

export default router;
