import js from "@eslint/js";
import globals from "globals";

export default [
  {
    extends: ["eslint:recommended"],
    files: ["**/*.{js,mjs}"],
    ignores: ["dist", "node_modules"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: [2, "always"],
    },
  },
];
