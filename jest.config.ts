export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },

    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "^@/(.*)$": "<rootDir>/src/$1",
        "/^.+\.svg$/": "jest-transformer-svg"
    },
    "resolver": undefined,
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};