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
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
