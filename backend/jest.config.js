module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "ts"],
    testMatch: ["**/tests/**/*.test.ts"], // Cambia el patrón para coincidir con tu estructura
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
  };