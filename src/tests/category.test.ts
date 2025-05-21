import request from "supertest";
import { CategoryRepository } from "../app/modules/Category/category.repository";
import {
  mockAuthorizeMiddleware,
  testAdminToken,
  testInstructorToken,
} from "./utils/mockAuth";
import { mockCategory } from "./utils/mockdata";
import {
  dataValidationTest,
  forbiddenAccessTest,
  unauthorizeAccessTest,
} from "./utils/reusableTest";
import app from "../app";

jest.mock("../app/modules/Category/category.repository.ts");
const mockedRepository = CategoryRepository as jest.Mocked<
  typeof CategoryRepository
>;

const routePrefix = "/api/v1/categories";

describe("Category Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Add new category
  describe(`POST ${routePrefix} -> Add new category`, () => {
    // 401
    unauthorizeAccessTest(routePrefix, "post");

    // 403
    forbiddenAccessTest({
      route: routePrefix,
      method: "post",
      authToken: testInstructorToken,
    });

    // 400
    dataValidationTest({
      route: routePrefix,
      method: "post",
      authToken: testAdminToken,
      body: {},
    });

    it("should throw error if category name already exist", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryByName.mockResolvedValue(mockCategory);

      const res = await request(app)
        .post(routePrefix)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.findCategoryByName).toHaveBeenCalled();
    });

    it("should add new category if pass valid data", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.addCategory.mockResolvedValue(mockCategory);
      mockedRepository.findCategoryByName.mockReset();

      const res = await request(app)
        .post(routePrefix)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.addCategory).toHaveBeenCalled();
    });
  });

  // Get all categories
  describe(`GET ${routePrefix} -> Get all categories`, () => {
    it("should return all categories", async () => {
      const categories = [mockCategory];
      mockedRepository.getAllCategories.mockResolvedValue(categories);

      const res = await request(app).get(routePrefix);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.getAllCategories).toHaveBeenCalled();
    });
  });

  // Update category
  describe(`PUT ${routePrefix}/:id -> Update category`, () => {
    const route = `${routePrefix}/category-id`;

    // 401
    unauthorizeAccessTest(route, "put");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "put",
      authToken: testInstructorToken,
    });

    // 400
    dataValidationTest({
      route: route,
      method: "put",
      authToken: testAdminToken,
      body: { name: "" },
    });

    it("should throw error if category_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockReset();

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should throw error if category name already exist", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockResolvedValue(mockCategory);
      mockedRepository.findCategoryByName.mockResolvedValue(mockCategory);

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.findCategoryById).toHaveBeenCalled();
      expect(mockedRepository.findCategoryByName).toHaveBeenCalled();
    });

    it("should update category, if pass valid data", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockResolvedValue(mockCategory);
      mockedRepository.findCategoryByName.mockReset();
      mockedRepository.updateCategory.mockResolvedValue(mockCategory);

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.findCategoryById).toHaveBeenCalled();
      expect(mockedRepository.updateCategory).toHaveBeenCalled();
    });
  });

  // Delete Category
  describe(`DELETE ${routePrefix}/:id -> Delete Category`, () => {
    const route = `${routePrefix}/category-id`;

    // 401
    unauthorizeAccessTest(route, "delete");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "delete",
      authToken: testInstructorToken,
    });

    it("should throw error if category_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockReset();

      const res = await request(app)
        .delete(route)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should delete category", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockResolvedValue(mockCategory);
      mockedRepository.deleteCategory.mockResolvedValue(mockCategory);

      const res = await request(app)
        .delete(route)
        .set("Authorization", testAdminToken)
        .send({
          name: mockCategory.name,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.findCategoryById).toHaveBeenCalled();
      expect(mockedRepository.deleteCategory).toHaveBeenCalled();
    });
  });
});
