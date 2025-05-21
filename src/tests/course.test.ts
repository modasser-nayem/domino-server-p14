/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { CourseRepository } from "../app/modules/Course/course.repository";
import app from "../app";
import {
  mockAuthorizeMiddleware,
  testAdminToken,
  testInstructorToken,
  testStudentToken,
} from "./utils/mockAuth";
import {
  dataValidationTest,
  forbiddenAccessTest,
  unauthorizeAccessTest,
} from "./utils/reusableTest";
import {
  mockCategory,
  mockInstructor,
  mockResponseMeta,
} from "./utils/mockdata";

jest.mock("../app/modules/Course/course.repository.ts");

const mockedRepository = CourseRepository as jest.Mocked<
  typeof CourseRepository
>;

const courseData = {
  title: "Test course title",
  thumbnail: "test thumbnail",
  description: "this is test description",
  category_id: "category_id",
  price: 599,
};

const mockCourse = {
  id: "course-id-123",
  ...courseData,
};

const routePrefix = "/api/v1/courses";

describe("Course Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Create course
  describe(`POST ${routePrefix} -> Create New Course`, () => {
    // 401
    unauthorizeAccessTest(routePrefix, "post");

    // 403
    forbiddenAccessTest({
      route: routePrefix,
      method: "post",
      authToken: testInstructorToken,
    });

    const courseData = {
      title: "test title",
      thumbnail: "test thumbnail",
      description: "this is test description",
      category_id: "category-id-123",
      // price: 599,
    };

    // 400
    dataValidationTest({
      route: routePrefix,
      method: "post",
      authToken: testAdminToken,
      body: courseData,
    });

    it("should throw error if category_id is invalid", async () => {
      mockAuthorizeMiddleware();

      const courseData = {
        title: "test title",
        thumbnail: "test thumbnail",
        description: "this is test description",
        category_id: "category-id-123",
        price: 599,
      };

      const res = await request(app)
        .post(routePrefix)
        .set("Authorization", testAdminToken)
        .send(courseData);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it("should create course", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCategoryById.mockResolvedValue(mockCategory);
      mockedRepository.createCourse.mockResolvedValue(mockCourse as any);

      const courseData = {
        title: "test title",
        thumbnail: "test thumbnail",
        description: "this is test description",
        category_id: "category-id-123",
        price: 599,
      };

      const res = await request(app)
        .post(routePrefix)
        .set("Authorization", testAdminToken)
        .send(courseData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.createCourse).toHaveBeenCalled();
    });
  });

  // Get courses
  describe(`GET ${routePrefix} -> Get Courses`, () => {
    it("Should return all courses", async () => {
      const courses = [mockCourse as any];

      mockedRepository.getAllCourse.mockResolvedValue({
        data: courses,
        meta: mockResponseMeta,
      });

      const res = await request(app).get(routePrefix);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.getAllCourse).toHaveBeenCalled();
    });
  });

  // Get student enrolled courses
  describe(`GET ${routePrefix}/student -> Get student enrolled courses`, () => {
    const route = `${routePrefix}/student`;

    // 401
    unauthorizeAccessTest(route, "get");

    // 403
    forbiddenAccessTest({
      route,
      method: "get",
      authToken: testInstructorToken,
    });

    it("Should return student enrolled courses", async () => {
      const courses = [mockCourse as any];

      mockAuthorizeMiddleware();
      mockedRepository.getStudentEnrolledCourses.mockResolvedValue({
        data: courses,
        meta: { page: 10, limit: 10, total: 5, totalPages: 1 },
      });

      const res = await request(app)
        .get(`${routePrefix}/student`)
        .set("Authorization", testStudentToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.getStudentEnrolledCourses).toHaveBeenCalled();
    });
  });

  // Get instructor assign courses
  describe(`Get ${routePrefix}/instructor -> Get instructor assign courses`, () => {
    const route = `${routePrefix}/instructor`;

    // 401
    unauthorizeAccessTest(route, "get");

    // 403
    forbiddenAccessTest({
      route,
      method: "get",
      authToken: testStudentToken,
    });

    it("should return instructor assign all courses", async () => {
      mockAuthorizeMiddleware();
      const courses = [mockCourse as any];

      mockedRepository.getInstructorAssignCourses.mockResolvedValue({
        data: courses,
        meta: mockResponseMeta,
      });

      const res = await request(app)
        .get(route)
        .set("Authorization", testInstructorToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.getInstructorAssignCourses).toHaveBeenCalled();
    });
  });

  // Get Course Details
  describe(`Get ${routePrefix}/:id -> Get Course Details`, () => {
    it("should throw error if course_id is invalid", async () => {
      const res = await request(app).get(`${routePrefix}/invalid-id`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.getCourseDetails).toHaveBeenCalled();
    });

    it("should return course details", async () => {
      const courseDetails = {
        id: "course-id",
        title: "test title",
        description: "test description",
        thumbnail: "test thumbnail",
        category: mockCategory,
        price: 599,
        status: "open",
      } as any;
      mockedRepository.getCourseDetails.mockResolvedValue(courseDetails);

      const res = await request(app).get(`${routePrefix}/id`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(courseDetails.title);
      expect(mockedRepository.getCourseDetails).toHaveBeenCalled();
    });
  });

  // Update course
  describe(`PUT ${routePrefix}/:id -> Update Course Information`, () => {
    const route = `${routePrefix}/course-id-123`;

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
      body: {
        price: "599",
      },
    });

    it("should throw error if course_id is invalid", async () => {
      mockAuthorizeMiddleware();

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          category_id: "category-id-123",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should throw error if category_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue(mockCourse as any);
      mockedRepository.findCategoryById.mockReset();

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          category_id: "category-id-123",
        });

      expect(mockedRepository.findCourseById).toHaveBeenCalled();
      expect(mockedRepository.findCategoryById).toHaveBeenCalled();
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should update course if pass valid data", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue(mockCourse as any);
      mockedRepository.findCategoryById.mockResolvedValue(mockCategory);
      mockedRepository.updateCourse.mockResolvedValue(mockCourse as any);

      const res = await request(app)
        .put(route)
        .set("Authorization", testAdminToken)
        .send({
          price: 599,
          category_id: "category-id",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.price).toBe(mockCourse.price);
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
      expect(mockedRepository.findCategoryById).toHaveBeenCalled();
      expect(mockedRepository.updateCourse).toHaveBeenCalled();
    });
  });

  // Update course status
  describe(`PATCH ${routePrefix}/status/:id -> Update Course Status`, () => {
    const route = `${routePrefix}/status/course-id-123`;

    // 401
    unauthorizeAccessTest(route, "patch");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "patch",
      authToken: testInstructorToken,
    });

    // 400
    dataValidationTest({
      route: route,
      method: "patch",
      authToken: testAdminToken,
      body: {},
    });

    it("should throw error if course_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockReset();

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          status: "upcoming",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should throw error if status already updated", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue({
        ...mockCourse,
        status: "upcoming",
      } as any);

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          status: "upcoming",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
    });

    it("should throw error if 'open' course update to 'upcoming'", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue({
        ...mockCourse,
        status: "open",
      } as any);

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          status: "upcoming",
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
    });

    it("should update course status, if 'upcoming' to 'open/close' or 'open' to 'close'", async () => {
      mockAuthorizeMiddleware();
      const courseData = { ...mockCourse, status: "upcoming" } as any;
      mockedRepository.findCourseById.mockResolvedValue(courseData);
      mockedRepository.updateCourseStatus.mockResolvedValue({
        ...courseData,
        status: "open",
      });

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          status: "open",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe("open");
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
      expect(mockedRepository.updateCourseStatus).toHaveBeenCalled();
    });
  });

  // Assign course instructor
  describe(`PATCH ${routePrefix}/assign/:id -> Assign Course Instructor`, () => {
    const route = `${routePrefix}/assign/course-id-123`;

    // 401
    unauthorizeAccessTest(route, "patch");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "patch",
      authToken: testInstructorToken,
    });

    // 400
    dataValidationTest({
      route: route,
      method: "patch",
      authToken: testAdminToken,
      body: {},
    });

    it("should throw error if course_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockReset();

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          instructor_id: mockInstructor.id,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should throw error if instructor_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue(mockCourse as any);

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          instructor_id: mockInstructor.id,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
    });

    it("should assign instructor, if provide valid data", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockResolvedValue(mockCourse as any);
      mockedRepository.findInstructor.mockResolvedValue(mockInstructor as any);
      mockedRepository.assignCourseInstructor.mockResolvedValue(
        mockCourse as any,
      );

      const res = await request(app)
        .patch(route)
        .set("Authorization", testAdminToken)
        .send({
          instructor_id: mockInstructor.id,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(mockedRepository.findCourseById).toHaveBeenCalled();
      expect(mockedRepository.findInstructor).toHaveBeenCalled();
      expect(mockedRepository.assignCourseInstructor).toHaveBeenCalled();
    });
  });

  // TODO: Delete course
  describe(`DELETE ${routePrefix}/:id -> Delete course`, () => {
    const route = `${routePrefix}/course-id-123`;

    // 401
    unauthorizeAccessTest(route, "delete");

    // 403
    forbiddenAccessTest({
      route: route,
      method: "delete",
      authToken: testInstructorToken,
    });

    it("should throw error if course_id is invalid", async () => {
      mockAuthorizeMiddleware();
      mockedRepository.findCourseById.mockReset();

      const res = await request(app)
        .delete(route)
        .set("Authorization", testAdminToken);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
