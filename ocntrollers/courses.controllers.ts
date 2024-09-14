import { Course } from "../models/Course";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
export let courses: Course[] = [
    {
      name: "html",
      id: 1,
      describtion: "html course for beginners",
    },
    {
      name: "css",
      id: 2,
      describtion: "css course for beginners",
    },
  ];


  
let getAllCourses = (req: Request<{}, {}, {}, {}>, res: Response) => {
  res.json(courses);
};

let getCourse = (req:Request, res:Response) => {
  const course = courses.find((c) => c.id == +req.params.courseId);
  if (!course) {
    res.status(404).json({ msg: "course Not found ..." });
  } else {
    res.json(course);
  }
};

let addCourse = (req: Request, res: Response) => {
    let newCourse = { ...req.body, id: courses.length + 1 };
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    courses.push(newCourse);
    res.json(courses);
  }

let updateCourse = (req:Request, res:Response) => {
    let courseId: number = +req.params.courseId;
    let course = courses.find((c) => c.id == courseId);
    console.log(courseId);
    if (!course) {
      res.status(404).json({ msg: "course Not found ..." });
    } else {
      course = {...course , ...req.body} ; 
      courses = courses.filter(c=>c.id != courseId) ;
      courses.push(course!) ;
      console.log(courses)
      res.status(200).json(course) ; 
    }
  }

let deleteCourse = (req:Request, res:Response) => {
    let courseId: number = +req.params.courseId;
    let course = courses.find((c) => c.id == courseId);
    if (!course) {
      res.status(404).json({ msg: "course Not found ..." });
    } else {
      courses = courses.filter(c=>c.id != courseId) ; 
      res.status(200).json(courses) ;  
    }
  }


export { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse };