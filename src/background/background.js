browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    console.log("on installed");
    await browser.storage.local.set({
      gw2Dark: "dark",
    });
  }
});

browser.runtime.onConnect.addListener(async () => {
  console.log("on connect");
});

browser.runtime.onStartup.addListener(async () => {
  console.log("on startup");
});

browser.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.includes("wiki")) {
    console.log("at wiki");
    let colorMode = await browser.storage.local.get("gw2Dark");
    let newColor = colorMode.gw2Dark == "dark" ? "light" : "dark";
    await saveColorMode(newColor);
    setColorMode(newColor);
    reloadTabs(newColor);
  }
});

function getGW2WikiTabs() {
  console.log("getgw2wikitabs");
  // active: true can be added to query to have tab-specific toggling
  return browser.tabs
    .query({
      url: "*://*.guildwars2.com/*",
    })
    .catch(() => {
      return null;
    });
}

function reloadTabs(colorMode) {
  console.log("RELOAD TABS");

  if (colorMode === "dark") {
    browser.action.setIcon({ path: "../icons/gw2-dark-48.png" });
    return;
  }
  browser.action.setIcon({ path: "../icons/gw2-disabled.png" });
}

function setColorMode(colorMode) {
  console.log("setcolormode");

  const gw2Tabs = getGW2WikiTabs();
  if (gw2Tabs) {
    for (const tab of gw2Tabs) {
      // FIXME: sendMessage doesn't work this way without the bundling
      console.log("tabs!", tab);
    }
  }
}

async function saveColorMode(color) {
  console.log("toggle dark");
  console.log("actual color: ", color);
  await browser.storage.local.set({
    gw2Dark: color,
  });
}
