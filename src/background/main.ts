import { sendMessage } from "webext-bridge/background";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

interface IsDarkModeEnabled {
  dark: boolean;
}

// TODO Action > left click: toggle for all tabs
// TODO middle click: toggle for current tab
// TODO right click: popup menu with idk what yet, leave out until implemented

browser.runtime.onInstalled.addListener(async (): Promise<void> => {
  // TODO execute script on install so users don't have to refresh
  const gw2WikiTabs = await browser.tabs.query({ url: "*://*.guildwars2.com/*" });
  for (const tab of gw2WikiTabs) {
    if (tab.url?.match(/guildwars2/i)) {
      sendMessage("enable-all-tabs", { all: true }, { context: "content-script", tabId: tab.id! });
    }
  }

  browser.action.setBadgeText({
    text: "ON",
  });
  browser.storage.local.set({ dark: true });
});
browser.runtime.onConnect.addListener(async () => {
  const isEnabled = (await browser.storage.local.get(["dark"])) as IsDarkModeEnabled;
  if (isEnabled.dark) {
    setColorMode(isEnabled.dark);
  }
});
browser.runtime.onStartup.addListener(async () => {
  // browser.action.setIcon({ path: "./assets/icon-48.png" })
});

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.incognito) {
    if (tab.url && tab.url.includes("guildwars2")) {
      const isEnabled = await browser.storage.local.get(["dark"]);

      if (isEnabled.dark) {
        browser.action.setBadgeText({ text: "OFF" });
        browser.storage.local.set({ dark: false });
        setColorMode(false);
      } else {
        browser.action.setBadgeText({ text: "ON" });
        browser.storage.local.set({ dark: true });
        setColorMode(true);
      }
    }
  }
});

async function setColorMode(colorModeToggle: boolean) {
  const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true });
  await sendMessage(
    "dark-mode-toggle",
    { dark: colorModeToggle },
    { context: "content-script", tabId: tab.id! },
  ).catch((error) => {
    // TODO extension error handling
    return error;
  });
}
