const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const { fixupConfigRules } = require("@eslint/compat");
const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.js"); // Find a fix for the lint issue later.

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...fixupConfigRules(compat.extends("next")),
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  ...baseConfig,
  // @ts-expect-error due to module issue on line 5.
  ...nx.configs["flat/react-typescript"],
  { ignores: [".next/**/*"] },
];
