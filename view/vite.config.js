import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// export default defineConfig({
//   plugins: [react(), eslint()],
// });

// // export default defineConfig({
// //   plugins: [react(), eslint()],
// //   server: {
// //     proxy: {
// //       "/api": {
// //         target: "http://127.0.0.1:3000/",
// //         changeOrigin: true,
// //         secure: false,
// //       },
// //     },
// //   },
// // });
// // vite.config.js

// /*  npm install vite-plugin-eslint --save-dev
//  very imp for login type error*/
