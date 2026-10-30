// @ts-check
import { defineConfig } from "astro/config";

// The build fills the root of https://workbench-soft.github.io. The Pages
// workflow adds the Jekyll Memories site and the other folders next to it.
export default defineConfig({
  site: "https://workbench-soft.github.io",
  outDir: "./dist",
});
