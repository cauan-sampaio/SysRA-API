const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'r2i7o6',
  e2e: {
    baseUrl: 'https://api.sysra-h.maracanau.ifce.edu.br/v1/',
    setupNodeEvents(on, config) {
      // implement node event listeners here 
    },
  },
});
