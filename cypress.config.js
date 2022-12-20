const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  waitForAnimations: false,
  redirectionLimit: 9999999999999,
  pageLoadTimeout: 9999999999999,
  numTestsKeptInMemory: 0,
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});