/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  setupFilesAfterEnv: ['./src/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/src/fileMock.js',  },

}