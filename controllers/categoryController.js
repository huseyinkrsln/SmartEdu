import Category from "../models/Category.js";

export async function createCategory(req, res) {
  try {
    await Category.create(req.body);
    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}
