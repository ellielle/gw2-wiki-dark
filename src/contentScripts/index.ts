import { onMessage } from "webext-bridge/content-script";

(async () => {
  const isEnabled = await browser.storage.local.get(["dark"]);
  // TODO send message to set badge text
  if (isEnabled.dark) {
    loadDarkMode();
  }
})();
// TODO use the local storage composable
// TODO clean up unused files, like stores, etc

function loadDarkMode() {
  const isDarkMode = window.location.search;

  if (!isDarkMode.includes("vector")) {
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }${
      window.location.search === "" ? "?useskin=vector" : `${window.location.search}&useskin=vector`
    }${window.location.hash}`;

    window.location.replace(newUrl);
  }
}

function removeDarkMode() {
  let searchData;

  if (window.location.search.includes("vector")) {
    searchData = window.location.search.replace(/[&?]useskin=vector/, "");

    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }${searchData ?? window.location.search}${window.location.hash}`;

    window.location.replace(newUrl);
  }
}

onMessage("dark-mode-toggle", ({ data }) => {
  if (!data.dark) {
    removeDarkMode();
  } else if (data.dark) {
    loadDarkMode();
  }
});

// onMessage("enable-all-tabs", async ({ data }) => {
//   if (data.all) {
//     console.log("all on");
//   } else {
//     console.log("all off");
//   }
// });
