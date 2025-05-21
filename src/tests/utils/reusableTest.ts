/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import app from "../../app";
import { mockAuthorizeMiddleware } from "./mockAuth";

interface ErrorTestOptions {
  message?: string;
  route: string;
  app: any;
  method: "get" | "post" | "put" | "patch" | "delete";
  body?: any;
  headers?: Record<string, string>;
  expectedStatus: number;
  expectedSuccess?: boolean;
  expectedMessage?: string;
  expectErrorsArray?: boolean;
  beforeRequest?: () => void; // for mockAuthorizeMiddleware or any setup
}

export const errorResponseTest = ({
  message,
  route,
  app,
  method,
  body,
  headers = {},
  expectedStatus,
  expectedSuccess = false,
  expectedMessage,
  expectErrorsArray = false,
  beforeRequest,
}: ErrorTestOptions) => {
  const should = message || `should return ${expectedStatus} error`;

  it(should, async () => {
    // Optional setup before the request
    if (beforeRequest) beforeRequest();

    let req = request(app)[method](route);

    // Set headers
    for (const [key, value] of Object.entries(headers)) {
      req = req.set(key, value);
    }

    // Send body if applicable
    if (body && ["post", "put", "patch"].includes(method)) {
      req.send(body);
    }

    const res = await req;

    expect(res.status).toBe(expectedStatus);
    expect(res.body.success).toBe(expectedSuccess);

    if (expectedMessage) {
      expect(res.body.message).toMatch(expectedMessage);
    }

    if (expectErrorsArray) {
      expect(Array.isArray(res.body.errors)).toBe(true);
    }
  });
};

export const unauthorizeAccessTest = (
  route: string,
  method: "get" | "post" | "put" | "patch" | "delete",
) => {
  errorResponseTest({
    message: "should return 401 unauthorize access if user is not logged in",
    route,
    app,
    method,
    expectedStatus: 401,
    expectedSuccess: false,
  });
};

export const forbiddenAccessTest = ({
  route,
  method,
  authToken,
}: {
  route: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  authToken: string;
}) => {
  errorResponseTest({
    message: "should return 403 forbidden access if user lacks permission",
    route,
    app,
    method,
    headers: {
      Authorization: authToken,
    },
    expectedStatus: 403,
    expectedSuccess: false,
    beforeRequest: () => mockAuthorizeMiddleware(),
  });
};

export const dataValidationTest = ({
  route,
  method,
  authToken,
  body,
}: {
  route: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  authToken: string;
  body: any;
}) => {
  errorResponseTest({
    message:
      "should return 400 data validation error for invalid or empty value",
    route,
    app,
    method,
    body,
    headers: {
      Authorization: authToken,
    },
    expectedStatus: 400,
    expectedSuccess: false,
    beforeRequest: () => mockAuthorizeMiddleware(),
  });
};
