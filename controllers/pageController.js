import nodemailer from "nodemailer";
import Course from '../models/Course.js';
import User from '../models/User.js';

export async function getIndexPage(req, res) {

const courses =await Course.find().sort('-createdAt').limit(2);
const totalCourse =await Course.countDocuments();
const totalStudent =await User.countDocuments({role:'student'});
const totalTeacher =await User.countDocuments({role:'teacher'});

  res.status(200).render("index", {
    page_name: "index",
    totalCourse,
    courses,
    totalStudent,
    totalTeacher
  });
}

export function getAboutPage(req, res) {
  res.status(200).render("about", {
    page_name: "about",
  });
}

export function getRegisterPage(req, res) {
  res.status(200).render("register", {
    page_name: "register",
  });
}

export function getLoginPage(req, res) {
  res.status(200).render("login", {
    page_name: "login",
  });
}

export function getContactPage(req, res) {
  res.status(200).render("contact", {
    page_name: "contact",
  });
}

export async function sendEmail(req, res) {
  try {
    const outputMessage = `
<h1> Mail Details </h1>
<ul>
  <li>Name: ${req.body.name} </li>
  <li>Email: ${req.body.email} </li>
</ul>
<h1>Message</h1>
<p>${req.body.message}</p>
`;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hhsynkkrsln@gmail.com", //gmail account
        pass: "ywdatatmlfrvnxzq", // gmail password (google account-uygulama şifreleri)
      },
    });

    let info = await transporter.sendMail({
      from: `"Smart Edu Contact Form" <hhsynkrsln@gmail.com>`,
      to: "hhsynkkrsln@gmail.com",
      subject: "Hello ",
      text: "Hello other world",
      html: outputMessage,
    });


    req.flash("success", "we received your messsage succesfuly");
    res.status(200).redirect("contact");
  } catch (err) {
    req.flash("error", `something happened ! ${err}`);
    res.status(400).redirect("contact");
  }
}
