browser.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    console.log("on installed");
    await browser.storage.local.set({
      gw2Dark: "dark",
    });
  }
});

browser.runtime;

browser.action.onClicked.addListener(async (tab) => {
  if (tab.url && tab.url.includes("wiki")) {
    console.log("at wiki");
    let colorMode = await browser.storage.local.get("gw2Dark");
    let newColor = colorMode.gw2Dark == "dark" ? "light" : "dark";
    saveColorMode(newColor);
    setColorModeInTabs(newColor);
    reloadTabs(newColor);
  }
});

async function getGW2WikiTabs() {
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
    browser.action.setIcon({ path: "src/icons/gw2-dark-48.png" });
    return;
  }
  browser.action.setIcon({ path: "src/icons/gw2-disabled.png" });
}

async function setColorModeInTabs(colorMode) {
  console.log("setcolormode");

  const gw2Tabs = await getGW2WikiTabs();
  if (gw2Tabs) {
    for (const tab of gw2Tabs) {
      // BUG: sendMessage fails on first attempt(?) might need to wake up something?
      browser.tabs.sendMessage(tab.id, colorMode);
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
