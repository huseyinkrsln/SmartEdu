import Course from "../models/Course.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export async function createCourse(req, res) {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    req.flash("success", "Course is created succesfuly");
    res.status(201).redirect("/courses");
  } catch (error) {
    req.flash("error", "something happened");
    res.status(400).redirect("/courses");
  }
}

export async function getAllCourses(req, res) {
  try {
    const query = req.query.search;
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ""), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user");

    const categories = await Category.find();
    res.status(200).render("courses", {
      courses,
      page_name: "courses",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function getCourse(req, res) {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    ); //populate: to achive user who logged
    const categories = await Category.find();
    res.status(200).render("course", {
      course,
      page_name: "courses",
      categories,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function enrollCourse(req, res) {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.push({ _id: req.body.course_id });
    await user.save().then(() => console.log("course Saved "));

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function releaseCourse(req, res) {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.pop({ _id: req.body.course_id });
    await user.save().then(() => console.log("course removed"));
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findOneAndRemove({ slug: req.params.slug });
    req.flash('error',`${course} is removed`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
}

export async function updateCourse (req,res){
  try {
    
const course = await Course.findOne({slug:req.params.slug});
course.name = req.body.name;
course.description = req.body.description;
course.category = req.body.category;

course.save();

res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status:'fail',
      error,
    })
  }
}