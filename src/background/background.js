// Sets the extension to dark mode on installation
// NOTE: This may need to be changed
browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    await browser.storage.local.set({
      gw2Dark: "dark",
    });
  }
});

// TODO: the addon should dark mode new tabs when they open
// will probably need to listen for domloaded event or something similar

// Listens for a click event on the extension icon
browser.action.onClicked.addListener(async (tab) => {
  // Wake up background page so it can establish a connection without error
  let gettingPage = await browser.runtime.getBackgroundPage();

  // Only activate extension on GW2 wiki pages
  if (tab.url && tab.url.includes("wiki")) {
    let colorMode = await browser.storage.local.get("gw2Dark");
    let newColor = colorMode.gw2Dark == "dark" ? "light" : "dark";
    saveColorMode(newColor);
    setColorModeInTabs(newColor);
    changeIcon(newColor);
  }
});

// getGW2WikiTabs returns an Array of all browser tabs opened to the GW2 wiki
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
      // BUG: sendMessage fails on first attempt(?) might need to wake up something?
      browser.tabs.sendMessage(tab.id, colorMode);
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
