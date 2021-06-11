module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["packages/*/tsconfig.json"],
  },
  ignorePatterns: ["**/*.d.ts"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/restrict-plus-operands": "off"
  },
};
