module.exports = {

  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/test/mocks/svg.ts",
  },
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/setEnvVars.js"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
};
