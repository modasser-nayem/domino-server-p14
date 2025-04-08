import express from "express";
import { CategoryController } from "./category.controller";
import { authMiddleware } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";
import { categorySchemaValidation } from "./category.validation";
import { asyncHandler } from "../../utils/asyncHandler";

class CategoryRouter {
  public router: express.Router;
  private categoryController: CategoryController;
  constructor() {
    this.router = express.Router();
    this.categoryController = new CategoryController();
    this.initRoutes();
  }

  private initRoutes() {
    // Add New Category
    this.router.post(
      "/",
      authMiddleware("admin"),
      requestValidate(categorySchemaValidation.addCategory),
      asyncHandler(this.categoryController.addCategory),
    );

    // Get All Categories
    this.router.get(
      "/",
      asyncHandler(this.categoryController.getAllCategories),
    );

    // Update Category
    this.router.put(
      "/:id",
      authMiddleware("admin"),
      requestValidate(categorySchemaValidation.updateCategory),
      asyncHandler(this.categoryController.updateCategory),
    );

    // Delete Category
    this.router.delete(
      "/:id",
      authMiddleware("admin"),
      asyncHandler(this.categoryController.deleteCategory),
    );
  }
}

const categoryRoutes = new CategoryRouter().router;
export default categoryRoutes;
