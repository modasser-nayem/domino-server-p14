import { Router } from "express";
import authRoutes from "../modules/Auth/auth.routes";
import userRoutes from "../modules/User/user.routes";
import categoryRoutes from "../modules/Category/category.routes";
import courseRoutes from "../modules/Course/course.routes";
import lessonRoutes from "../modules/Lesson/lesson.routes";
import courseModuleRoutes from "../modules/CourseModule/module.routes";

const routers = Router();
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/courses",
    route: courseRoutes,
  },
  {
    path: "/courses/:courseId/lessons",
    route: lessonRoutes,
  },
  {
    path: "/courses/:courseId/lessons/:lessonId/modules",
    route: courseModuleRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
