import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const isDev = (mode) => mode === "development";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  const proxyTargets = {
    development: "http://localhost:3000",
    testing: env.VITE_API_URL,
  };

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      // https://vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        "/api": {
          target: proxyTargets[mode],
          changeOrigin: true,
          secure: !isDev(mode),
        },
      },
    },
  };
});
