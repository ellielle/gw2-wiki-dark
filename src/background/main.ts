import { sendMessage } from "webext-bridge/background";
import { type Tabs, action, runtime } from "webextension-polyfill";
import { type ColorModeType, colorMode } from "~/logic";

runtime.onInstalled.addListener(async ({ reason }): Promise<void> => {
  if (reason === "install") {
    toggleDarkMode(colorMode.value ?? "dark");
  }
});

runtime.onConnect.addListener(async (): Promise<void> => {
  toggleDarkMode(colorMode.value);
});

runtime.onStartup.addListener(async (): Promise<void> => {
  toggleDarkMode(colorMode.value);
});

action.onClicked.addListener(async (tab): Promise<void> => {
  if (tab.url && tab.url.includes("guildwars2")) {
    toggleDarkMode(colorMode.value === "dark" ? "light" : "dark");
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

async function setColorModeAndReloadTabs(): Promise<void> {
  const gw2Tabs = await getGW2WikiTabs();
  if (colorMode.value === "dark") {
    await action.setIcon({ path: "../../assets/gw2-dark-48.png" });
  } else {
    await action.setIcon({ path: "../../assets/gw2-disabled.png" });
  }

  if (gw2Tabs) {
    for (const tab of gw2Tabs) {
      await sendMessage(
        "dark-mode-toggle",
        { dark: colorMode.value },
        { context: "content-script", tabId: tab.id! },
      );
    }
  }
}

async function toggleDarkMode(newColorMode: ColorModeType, message?: () => void): Promise<void> {
  if (message) {
    message();
  }
  colorMode.value = newColorMode;
  await setColorModeAndReloadTabs();
}
