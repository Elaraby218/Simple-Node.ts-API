import express from "express";
import {route} from "./routes/courses.rout";


const app = express();
const port: number = 5000;

app.use(route);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
