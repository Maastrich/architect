import { defineConfig } from "rollup";

import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: pkg.source,
  output: [
    {
      dir: "dist",
      format: "cjs",
      exports: "named",
      sourcemap: true,
      preserveModulesRoot: "./src",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    nodeResolve(),
  ],
});
