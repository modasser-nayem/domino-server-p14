import { Router } from "express";
import authRoutes from "../modules/Auth/auth.routes";
import userRoutes from "../modules/User/user.routes";
import categoryRoutes from "../modules/Category/category.routes";

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
];

moduleRoutes.forEach((route) => routers.use(route.path, route.route));

export default routers;
