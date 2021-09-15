const base = require("./jest.config");

module.exports = {
  ...base,
  testMatch: ["**/*.integrationTest.ts"],
  testTimeout: 240000,
  setupFiles: ["./setupIntegrationTests.js"],
};
