module.exports = {
  testEnvironment: "miniflare",
  testMatch: ["**/src/**/(*.)+test.+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "esbuild-jest",
  },
  moduleNameMapper: {
    __STATIC_CONTENT_MANIFEST: "<rootDir>/test/manifest.ts",
  },
};
