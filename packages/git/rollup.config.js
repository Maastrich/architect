import { defineConfig } from "rollup";

import pkg from "./package.json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelHelpers: "runtime",
      exclude: "node_modules/**",
    }),
    nodeResolve(),
  ],
});
