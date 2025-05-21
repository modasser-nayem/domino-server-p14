import request from "supertest";
import { LessonRepository } from "../app/modules/Lesson/lesson.repository";
import {
  mockAuthorizeMiddleware,
  mockInstructorCourseAccessMid,
  testAdminToken,
  testInstructorToken,
} from "./utils/mockAuth";
import { mockLesson } from "./utils/mockdata";
import {
  dataValidationTest,
  forbiddenAccessTest,
  unauthorizeAccessTest,
} from "./utils/reusableTest";
import app from "../app";

jest.mock("../app/modules/Lesson/lesson.repository.ts");
const mockedRepository = LessonRepository as jest.Mocked<
  typeof LessonRepository
>;

const routePrefix = "/api/v1/courses/course-id-123/lessons";

describe("Lesson Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create lesson
  describe(`POST ${routePrefix} -> Create lesson`, () => {
    const route = routePrefix;

    // 401
    unauthorizeAccessTest(route, "post");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "post",
      authToken: testAdminToken,
    });

    // 400
    dataValidationTest({
      route: route,
      method: "post",
      authToken: testInstructorToken,
      body: {},
    });
  });

  // Update lesson
  describe(`PUT ${routePrefix}/:lessonId -> Update lesson`, () => {
    const route = `${routePrefix}/lesson-id`;

    // 401
    unauthorizeAccessTest(route, "put");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "put",
      authToken: testAdminToken,
    });

    // 400
    dataValidationTest({
      route: route,
      method: "put",
      authToken: testInstructorToken,
      body: {
        title: "",
      },
    });
  });

  // Delete lesson
  describe(`DELETE ${routePrefix}/:lessonId -> Delete lesson`, () => {
    const route = `${routePrefix}/lesson-id-123`;

    // 401
    unauthorizeAccessTest(route, "delete");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "delete",
      authToken: testAdminToken,
    });

    it("should throw error if lesson_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockInstructorCourseAccessMid();

      const res = await request(app)
        .delete(route)
        .set("Authorization", testInstructorToken);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should throw error if lesson not exist that course", async () => {
      mockAuthorizeMiddleware();
      mockInstructorCourseAccessMid();
      mockedRepository.findLessonById.mockResolvedValue({
        ...mockLesson,
        course_id: "course-id",
      });

      const res = await request(app)
        .delete(route)
        .set("Authorization", testInstructorToken);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should delete course, if pass valid data", async () => {
      mockAuthorizeMiddleware();
      mockInstructorCourseAccessMid();
      mockedRepository.findLessonById.mockResolvedValue({
        ...mockLesson,
        course_id: "course-id-123",
      });
      mockedRepository.deleteLesson.mockResolvedValue(mockLesson);

      const res = await request(app)
        .delete(route)
        .set("Authorization", testInstructorToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(mockLesson.id);
      expect(mockedRepository.deleteLesson).toHaveBeenCalled();
    });
  });
});
