import "../browser-polyfill";
// getGW2WikiTabs returns a Promise that resolves to an Array
// of all browser tabs opened to the GW2 wiki
async function getGW2WikiTabs() {
  // active: true can be added to query to have tab-specific toggling
  return browser.tabs
    .query({
      url: "*://*.guildwars2.com/*",
    })
    .catch(() => {
      return null;
    });
}

// changeIcon changes the extension's browser action button
// to be colored when in dark mode, and greyscale in light mode
function changeIcon(colorMode) {
  if (colorMode === "dark") {
    browser.action.setIcon({ path: "src/icons/gw2-dark-48.png" });
    return;
  }
  browser.action.setIcon({ path: "src/icons/gw2-disabled.png" });
}

// setColorModeInTabs gets a list of open GW2 wiki tabs
// and sends a message to each with the new color mode
async function setColorModeInTabs(colorMode) {
  const gw2Tabs = await getGW2WikiTabs();
  if (gw2Tabs) {
    for (const tab of gw2Tabs) {
      await browser.tabs.sendMessage(tab.id, colorMode);
    }
  }
}

// saveColorMode saves the user's color mode preference
// to local storage
async function saveColorMode(color) {
  await browser.storage.local.set({
    gw2Dark: color,
  });
}

// Sets the extension to dark mode on installation
browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    await browser.storage.local.set({
      gw2Dark: "light",
    });
  }
});

// getColorMode is a helper function to retrieve the user's
// preference so it can be applied in listeners
async function getColorMode() {
  return await browser.storage.local.get("gw2Dark");
}

// TODO: add action for middle clicking that opens to the wiki
// can add an options page to set the default wiki language
//
// Listens for a click event on the extension icon
browser.action.onClicked.addListener(async (tab) => {
  // Wake up background page so it can establish a connection without error
  let gettingPage = await browser.runtime.getBackgroundPage();
  await gettingPage;

  // Only activate extension on GW2 wiki pages
  // This prevents it from changing the url on
  // other subdomains under guildwars2
  if (tab.url && tab.url.includes("wiki")) {
    let colorMode = await browser.storage.local.get("gw2Dark");
    let newColor = colorMode.gw2Dark == "dark" ? "light" : "dark";
    saveColorMode(newColor);
    setColorModeInTabs(newColor);
    changeIcon(newColor);
  }
});

// set a filter for the onUpdated listener to only
// listen for changes to the url in tabs that match
// *://*.guildwars2.com/*
const event_filter = {
  properties: ["url"],
};

browser.tabs.onUpdated.addListener(async (tabId, tabUrl, tab) => {
  if (tabUrl.url.includes("guildwars2") && tabUrl.url.includes("wiki")) {
    let colorMode = await getColorMode();
    await browser.tabs.sendMessage(tabId, colorMode.gw2Dark);
  }
}, event_filter);

browser.tabs.onCreated.addListener(async (tabId, tabUrl, tab) => {
  if (!tabUrl.url.includes("guildwars2") || tabUrl.url.includes("wiki")) {
    return;
  }
  let colorMode = await getColorMode();
  await browser.tabs.sendMessage(tabId, colorMode.gw2Dark);
});
