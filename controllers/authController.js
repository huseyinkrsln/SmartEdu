import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import Category from "../models/Category.js";
import Course from "../models/Course.js";

import User from "../models/User.js";

export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors.array()[0].msg);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
    res.status(400).redirect("/register");
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        //SESSION
        if (same) {
          req.session.userID = user._id;
          //req.session.userName = user.name;
          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "your password is not correct!");
          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "who are you ?");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export function logoutUser(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

export async function getDashboardPage(req, res) {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  // const user = await User.findOne({name:req.session.userName});
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();
  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users,
  });
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}
