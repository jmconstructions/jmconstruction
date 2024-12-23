import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:3000/",
        target: "https://jmconstruction.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "build", // Changed from 'dist' to 'build'
  },
});
// vite.config.js

/*  npm install vite-plugin-eslint --save-dev
 very imp for login type error*/
