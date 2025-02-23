module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@dogs/(.*)$': '<rootDir>/dogs/$1',
    '^@users/(.*)$': '<rootDir>/users/$1',
    '^@sponsorship/(.*)$': '<rootDir>/sponsorship/$1',
    '^@adoption/(.*)$': '<rootDir>/adoption/$1',
  },
};
