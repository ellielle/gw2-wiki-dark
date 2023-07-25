import { sendMessage } from "webext-bridge/background";
import { isDark } from "~/logic";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

async function getGW2WikiTabs() {
  // active: true can be added to query to have tab-specific toggling
  return await browser.tabs
    .query({
      url: "*://*.guildwars2.com/*",
    })
    .catch(() => {
      return null;
    });
}

async function setColorModeAndReloadTabs(colorModeToggle: boolean) {
  const gw2Tabs = await getGW2WikiTabs();

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

function toggleDarkMode(isDarkMode: boolean) {
  isDark.value = isDarkMode;
  if (isDarkMode) {
    browser.action.setIcon({ path: "../../assets/gw2-dark-48.png" });
  } else {
    browser.action.setIcon({ path: "../../assets/gw2-disabled.png" });
  }
  setColorModeAndReloadTabs(isDarkMode);
}

// TODO Action > left click: toggle for all tabs
// TODO middle click: toggle for current tab
// TODO right click: popup menu with idk what yet, leave out until implemented

browser.runtime.onInstalled.addListener(async (): Promise<void> => {
  // TODO execute script on install so users don't have to refresh
  toggleDarkMode(isDark.value ?? true);
});

browser.runtime.onConnect.addListener(async (): Promise<void> => {
  if (isDark.value) {
    setColorModeAndReloadTabs(isDark.value);
  }
});

browser.runtime.onStartup.addListener(async (): Promise<void> => {
  setColorModeAndReloadTabs(isDark.value);
});

browser.action.onClicked.addListener(async (tab): Promise<void> => {
  if (tab.url && tab.url.includes("guildwars2") && isDark) {
    toggleDarkMode(!isDark.value);
    sendMessage(
      "dark-mode-toggle",
      { dark: !isDark.value },
      { context: "content-script", tabId: tab.id! },
    );
  }
});
