import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporters: "verbose",
    environments: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
});
