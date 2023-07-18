import { isFirefox } from "~/env";
import { onMessage, sendMessage } from "webext-bridge/background";
import type { Tabs } from "webextension-polyfill";

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import("/@vite/client");
  // load latest content script
  import("./contentScriptHMR");
}

// TODO Action > left click: toggle for all tabs 
// TODO middle click: toggle for current tab
// TODO right click: popup menu with idk what yet, leave out until implemented

browser.runtime.onInstalled.addListener(async (): Promise<void> => {
  const gw2WikiTabs = await browser.tabs.query({ url: "*://*.guildwars2.com/*" });
  console.log(`gw2tabs: ${JSON.stringify(gw2WikiTabs)}`);

  // TODO execute the single only script this project has
  for (const tab of gw2WikiTabs) {
    console.log(tab);

    //       await browser.scripting.executeScript({
    //         target: { tabId: tab.id! },
    //         files: cs.js,
    //       });
    //     } catch (error) {
    //       console.log(`error: ${error}`);
    //     }
  }

  try {
    // await browser.scripting.executeScript({})
  } catch (error) {
    console.log(`installation error ${error}`);
  }

  // -----------------------------------------------------------

  browser.action.setBadgeText({
    text: "ON",
  });
  browser.storage.local.set({ dark: true });
});

browser.runtime.onStartup.addListener(() => {
  let isEnabled = browser.storage.local.get(["dark"]);
  if (isEnabled.dark) {
    setColorMode(isEnabled.dark);
  }
});

// let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
// browser.tabs.onActivated.addListener(async ({ tabId }) => {
//   if (!previousTabId) {
//     previousTabId = tabId;
//     return;
//   }

//   let tab: Tabs.Tab;

//   try {
//     tab = await browser.tabs.get(previousTabId);
//     previousTabId = tabId;
//   } catch {
//     return;
//   }

//   // eslint-disable-next-line no-console
//   console.log("previous tab", tab);
//   sendMessage("tab-prev", { title: tab.title }, { context: "content-script", tabId });
// });

// onMessage("get-current-tab", async () => {
//   try {
//     const tab = await browser.tabs.get(previousTabId);
//     return {
//       title: tab?.title,
//     };
//   } catch {
//     return {
//       title: undefined,
//     };
//   }
// });

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.incognito) {
    if (tab.url && tab.url.includes("guildwars2")) {
      let isEnabled = await browser.storage.local.get(["dark"]);

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

  await browser.tabs.sendMessage(tab.id, { colorMode: colorModeToggle }).catch((error) => {
    console.log(JSON.stringify(error));
  });
}
