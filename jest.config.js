export default {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { 
      configFile: './jest.babel.config.cjs' 
    }],
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
};