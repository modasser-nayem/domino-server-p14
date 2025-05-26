/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.ts", "!src/server.ts"],
  verbose: true,
  cache: true,
};
