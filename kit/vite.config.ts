import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// base "./" + hash routing: chạy được ở bất kỳ đường dẫn GitHub Pages nào.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: { "@": path.resolve("src") },
  },
  server: { fs: { allow: [".."] } },
});
