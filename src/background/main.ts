import { sendMessage } from "webext-bridge/background";
import { type Tabs, action, runtime } from "webextension-polyfill";
import { isDark } from "~/logic";

runtime.onInstalled.addListener((): void => {
  toggleDarkMode(isDark.value ?? true);
});

runtime.onStartup.addListener((): void => {
  toggleDarkMode(isDark.value);
});

runtime.onConnect.addListener((): void => {
  // TODO background script keeps interrupting idle and executing this
  toggleDarkMode(isDark.value);
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

  // TODO see if one of the async/awaits is causing the background script to stay alive
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
      sendMessage(
        "dark-mode-toggle",
        { dark: colorModeToggle },
        { context: "content-script", tabId: tab.id! },
      );
    }
  }
}

function toggleDarkMode(isDarkMode: boolean): void {
  isDark.value = isDarkMode;
  setColorModeAndReloadTabs(isDarkMode);
}
