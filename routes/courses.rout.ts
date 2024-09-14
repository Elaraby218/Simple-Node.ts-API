import express from "express";
import * as coursesController from "../ocntrollers/courses.controllers";
import { body } from "express-validator";

export let route = express.Router();

route.use(express.json());

route.get("/api/courses", coursesController.getAllCourses);

route.get("/api/courses/:courseId", coursesController.getCourse);

route.post(
  "/api/courses",
  [
    body("name")
      .notEmpty()
      .withMessage("title is required")
      .isLength({ min: 2 })
      .withMessage("title is at least two chars"),
    body("describtion").notEmpty().withMessage("description can not be empty"),
  ],
  coursesController.addCourse
);
// update the data
route.patch("/api/courses/:courseId", coursesController.updateCourse);

route.delete("/api/courses/:courseId", coursesController.deleteCourse);
