import { onMessage } from "webext-bridge/content-script";
import { isDark } from "~/logic";

(async () => {
  if (isDark.value) {
    loadDarkMode();
  }
})();

function loadDarkMode() {
  if (!window.location.search.includes("vector") && window.location.host.includes("wiki")) {
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
