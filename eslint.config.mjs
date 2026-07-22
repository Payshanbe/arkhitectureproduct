import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".agents/**",
      ".claude/**",
      ".codex/**",
      ".github/hooks/**",
      ".github/skills/**",
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "dist/**",
      "docs/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
