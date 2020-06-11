module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/*.test.(ts|tsx|js)"
    ],
    moduleNameMapper: {
        "^@(tests)(.*)$": "<rootDir>/tests/$2",
        "^@(services)/(.*)$": "<rootDir>/src/services/$2",
        "^@(constants)$": "<rootDir>/src/constants",
        "^@(interfaces)$": "<rootDir>/src/interfaces",
        "^@(exceptions)$": "<rootDir>/src/exceptions",
    },
};