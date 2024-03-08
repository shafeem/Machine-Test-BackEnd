const userSchema = require("../model/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const courseSchema = require("../model/course");
const chapterSchema = require("../model/chapter");

require("dotenv").config();

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", status: 400 });
    } else {
      const passwordMatcher = await bcrypt.compare(password, user.password);
      if (passwordMatcher) {
        const token = jwt.sign(
          { email: user.email, userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.json({ token: token, status: 200 });
      } else {
        return res.json({ status: 400, message: "Password is incorrect" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      console.log("user already existed");
      return res.json({ message: "User already exists", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userSchema.create({
      email,
      password: hashedPassword,
    });
    console.log("new user created: ", newUser);
    const token = jwt.sign(
      { email: user.email, userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "User created successfully",
      status: 201,
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

const createCourse = async (req, res) => {
  try {
    let { title, category, duration, description } = req.body;
    console.log(req.body);

    let existingCourse = await courseSchema.findOne({ title });

    if (existingCourse) {
      return res.json({ message: "Course already exists", status: 400 });
    }
    const newCourse = await courseSchema.create({
      title,
      category,
      duration,
      description,
    });
    res.json({ message: "Course created successfully", status: 201 });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

const getCourses = async (req, res) => {
  try {

    const courses = await courseSchema.find().populate("chapter");
    console.log(courses, ";;;;;");
    res.json({ courses, status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};
const courseDetails = async (req, res) => {
  try {
    const { id } = req.body; // Retrieve id from the request body
    console.log(req.body, ";;;;;;;;");

    let courseDetail = await courseSchema.findById(id);
    console.log(courseDetail);

    if (!courseDetail) {
      return res.json({ message: "Course not found", status: 404 });
    }
    res.json({ course: courseDetail, status: 200 });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

const createChapter = async (req, res) => {
  try {
    let { title, description, id } = req.body;

    const course = await courseSchema.findById(id);
    if (!course) {
      return res.json({ message: "Course not found", status: 404 });
    }

    const existingChapter = await chapterSchema.findOne({title, course: id});
    if(existingChapter){
      return res.json({message: "Chapter already exists", status: 400});
    }
    const newChapter = await chapterSchema.create({
      title,
      description,
      course: id
    });
    console.log(newChapter);
    const updatedCourse = await courseSchema.findByIdAndUpdate(
      id, { $push: { chapter: newChapter._id } }, {
        new: true }
    );

    console.log("Chapter created");
    res.json({ message: "Chapter created successfully", status: 201 });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internal server error", status: 500 });
  }
};

module.exports = {
  signin,
  signup,
  createCourse,
  getCourses,
  courseDetails,
  createChapter,
};
