module.exports = {
  roots: ['<rootDir>/src/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/dist/',
    '/build/',
    '/coverage/',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
