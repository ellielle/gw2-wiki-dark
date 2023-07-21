import { defineConfig } from "unocss/vite";
import { presetAttributify, presetIcons, presetUno, transformerDirectives } from "unocss";

// TODO
export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives()],
});
