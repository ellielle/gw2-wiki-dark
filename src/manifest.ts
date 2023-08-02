import fs from "fs-extra";
import type { Manifest } from "webextension-polyfill";
import type PkgType from "../package.json";
import { isDev, isFirefox, port, r } from "../scripts/utils";

export async function getManifest() {
  const pkg = (await fs.readJSON(r("package.json"))) as typeof PkgType;

  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: "./assets/gw2-dark-128.png",
      default_title: "Dark Mode Toggle",
      // default_popup: "./dist/popup/index.html",
    },
    // options_ui: {
    //   page: "./dist/options/index.html",
    //   open_in_tab: true,
    // },
    background: isFirefox
      ? {
          scripts: ["dist/background/index.mjs"],
          type: "module",
        }
      : {
          service_worker: "./dist/background/index.mjs",
        },
    icons: {
      16: "./assets/gw2-dark-16.png",
      48: "./assets/gw2-dark-48.png",
      128: "./assets/gw2-dark-128.png",
    },
    permissions: ["storage", "activeTab", "tabs"],
    host_permissions: ["*://*.guildwars2.com/*"],
    content_scripts: [
      {
        matches: ["*://*.guildwars2.com/*"],
        js: ["dist/contentScripts/index.global.js"],
        run_at: "document_start",
      },
    ],
    // web_accessible_resources: [
    //   {
    //     resources: ["dist/contentScripts/style.css"],
    //     matches: ["<all_urls>"],
    //   },
    // ],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : "script-src 'self'; object-src 'self'",
    },
    browser_specific_settings: isFirefox
      ? {
          gecko: {
            id: "gw2dark@ellielle",
            strict_min_version: "112.0",
          },
          // gecko_android: {
          //   strict_min_version: "112.0",
          // },
        }
      : undefined,
  };

  return manifest;
}
