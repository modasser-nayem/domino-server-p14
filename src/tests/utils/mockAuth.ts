import { AuthRepository } from "../../app/modules/Auth/auth.repository";
import { CourseRepository } from "../../app/modules/Course/course.repository";
import { JwtService } from "../../app/utils/jwt";

// Mock tokens for each role
const token = new JwtService();
export const testAdminToken = token.signAccessToken({
  id: "admin-id",
  role: "admin",
});
export const testStudentToken = token.signAccessToken({
  id: "student-id",
  role: "student",
});
export const testInstructorToken = token.signAccessToken({
  id: "instructor-id",
  role: "instructor",
});

export const mockAuthorizeMiddleware = () => {
  jest.spyOn(AuthRepository, "findById").mockResolvedValue({
    id: "admin-id",
    role: "admin",
    email: `admin@gmail.com`,
    name: "hello",
    created_at: new Date("2025-03-01T10:10:22.704Z"),
    profile_picture: null,
  });
};

export const mockInstructorCourseAccessMid = () => {
  jest
    .spyOn(CourseRepository, "isInstructorCourseAccess")
    .mockResolvedValue(true);
};
