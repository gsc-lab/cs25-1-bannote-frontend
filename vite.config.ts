import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    host: true,
        proxy: {
      "/api": {
        target: "http://210.101.236.160:8201",
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: "",
      },
    },
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
