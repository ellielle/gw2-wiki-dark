import { type Tabs, action, runtime } from "webextension-polyfill";
import { isDark } from "~/logic";

runtime.onInstalled.addListener((): void => {
  toggleDarkMode(isDark.value ?? true);
});

runtime.onStartup.addListener((): void => {
  toggleDarkMode(isDark.value ?? true);
});

runtime.onConnect.addListener((): void => {
  toggleDarkMode(isDark.value ?? true);
});

action.onClicked.addListener((tab): void => {
  if (tab.url && tab.url.includes("guildwars2")) {
    toggleDarkMode(!isDark.value ?? true);
  }
});

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

async function getGW2WikiTabs(): Promise<Tabs.Tab[] | null> {
  // active: true can be added to query to have tab-specific toggling

  return await browser.tabs
    .query({
      url: "*://*.guildwars2.com/*",
    })
    .catch(() => {
      return null;
    });
}

async function setColorModeAndReloadTabs(colorModeToggle: boolean): Promise<void> {
  const gw2Tabs = await getGW2WikiTabs();
  if (colorModeToggle) {
    action.setIcon({ path: "../../assets/gw2-dark-48.png" });
  } else {
    action.setIcon({ path: "../../assets/gw2-disabled.png" });
  }

  if (gw2Tabs) {
    for (const tab of gw2Tabs) {
      browser.tabs.sendMessage(tab.id!, { dark: isDark.value });
    }
  }
}

function toggleDarkMode(isDarkMode: boolean): void {
  isDark.value = isDarkMode;
  setColorModeAndReloadTabs(isDarkMode);
}
