import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const MODES = {
  development: "development",
  testing: "testing",
  production: "production",
};

const isDev = (mode) => mode === "development";
const isModes = (currentMode, ...modes) => {
  console.log({ currentMode, modes });

  const isModes = modes.some((mode) => currentMode === MODES[mode]);

  console.log({ isModes });

  return isModes;
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  const proxyTargets = {
    development: "http://localhost:3000",
    testing: env.VITE_API_URL,
    production: env.VITE_API_URL,
  };

  const proxyTarget = proxyTargets[mode];
  const isSecure = !isModes(mode, MODES.development, MODES.testing);

  console.log({ proxyTarget, mode, isSecure });

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    // https://github.com/vitejs/vite/discussions/7920#discussioncomment-3996695
    // https://esbuild.github.io/fyware-api/#source-root
    esbuild: {
      // "console.error"
      pure: ["console.log", "console.warn", "console.info"],
    },
    server: {
      // https://vitejs.dev/config/server-options.html#server-proxy
      proxy: {
        "/api": {
          target: proxyTarget,
          changeOrigin: true,
          secure: isSecure,
          // secure: !isDev(mode),
        },
      },
    },
  };
});
