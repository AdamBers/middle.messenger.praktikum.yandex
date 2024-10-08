import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),

  build: {
    outDir: resolve(__dirname, "dist"),
  },
  assetsInclude: ["**/*.hbs"],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [handlebars({})],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      handlebars: "handlebars/dist/handlebars.min.js",
    },
  },
});
