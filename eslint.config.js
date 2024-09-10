import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    // Отключаем ESLint для конфигурационных файлов через .eslintignore
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: ["eslint.config.js", "stylelint.config.js"], // Игнорирование файлов
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",
    },
  },
  pluginJs.configs.recommended,
];
