import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { nodeLoaderPlugin } from "@vavite/node-loader/plugin";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [sveltekit(), nodeLoaderPlugin()], // nodeLoaderPlugin new, may cause problems, sollte prob nicht in prod sein
  logLevel: "info",
  envPrefix: "CLIENT_",
  build: {
    sourcemap: true, // new, may cause problems
  },
  ssr: {
    external: ["reflect-metadata"],
  },
});
