/// <reference types="vitest" />
/// <reference types="Vite/client" />
import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: "dist",
    minify: true,
    rollupOptions: {
      treeshake: true,
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "fluwtate",
      fileName: "index",
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: "happy-dom",
  },
});
