/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy', // Игнорируем CSS/SCSS
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
