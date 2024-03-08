const express = require("express");

const {
  signin,
  signup,
  createCourse,
  getCourses,
  courseDetails,
  createChapter,
  chapterDetails,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", signin);
router.post("/signup", signup);
router.post("/create-course", createCourse);
router.get("/get-courses", getCourses);
router.post("/course-details", courseDetails);
router.post("/create-chapter",createChapter)
router.post("/chapter-details",chapterDetails)

module.exports = router;
