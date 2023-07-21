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
      default_icon: "./assets/icon-512.png",
      default_popup: "./dist/popup/index.html",
    },
    options_ui: {
      page: "./dist/options/index.html",
      open_in_tab: true,
    },
    background: isFirefox
      ? {
          scripts: ["dist/background/index.mjs"],
          type: "module",
        }
      : {
          service_worker: "./dist/background/index.mjs",
        },
    icons: {
      16: "./assets/icon-16.png",
      32: "./assets/icon-32.png",
      48: "./assets/icon-48.png",
      128: "./assets/icon-128.png",
    },
    permissions: ["tabs", "storage", "activeTab"],
    host_permissions: ["*://*.guildwars2/*"],
    content_scripts: [
      {
        matches: ["*://*.guildwars2.com/*"],
        js: ["dist/contentScripts/index.global.js"],
        run_at: "document_start",
      },
    ],
    web_accessible_resources: [
      {
        resources: ["dist/contentScripts/style.css"],
        matches: ["<all_urls>"],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        ? // this is required on dev for Vite script to load
          `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : "script-src 'self'; object-src 'self'",
    },
    browser_specific_settings: isFirefox
      ? {
          gecko: {
            id: "{5779845d-b1fc-4196-aa0a-4950dedff2f6}",
            // update_url: "https://github.com/ellielle/gw2-wiki-dark/firefox/update_manifest.json",
          },
        }
      : undefined,
  };

  return manifest;
}
