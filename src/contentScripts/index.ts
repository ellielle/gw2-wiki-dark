/* eslint-disable no-console */
import { onMessage } from "webext-bridge/content-script";

// import { createApp } from "vue";
// import App from "./views/App.vue";
// import { setupApp } from "~/logic/common-setup";

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(async () => {
  const isEnabled = await browser.storage.local.get(["dark"]);
  // TODO send message to set badge text
  if (isEnabled.dark) {
    loadDarkMode();
  } else {
    removeDarkMode();
  }

  // mount component to context window
  // const container = document.createElement("div");
  // container.id = __NAME__;
  // const root = document.createElement("div");
  // const styleEl = document.createElement("link");
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? "open" : "closed" }) || container;
  // styleEl.setAttribute("rel", "stylesheet");
  // styleEl.setAttribute("href", browser.runtime.getURL("dist/contentScripts/style.css"));
  // shadowDOM.appendChild(styleEl);
  // shadowDOM.appendChild(root);
  // document.body.appendChild(container);
  // const app = createApp(App);
  // setupApp(app);
  // app.mount(root);
})();

// console.info("[vitesse-webext] Hello world from content script");

// // communication example: send previous tab title from background page
// onMessage("tab-prev", ({ data }) => {
//   console.log(`[vitesse-webext] Navigate from page "${data.title}"`);
// });

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
    console.log("remove dark");
    removeDarkMode();
    console.log("restore dark");
  } else if (data.dark) {
    loadDarkMode();
  }
});

onMessage("enable-all-tabs", async ({ data }) => {
  console.log("enable all tabs", data);
});

// (async function () {
//   let isEnabled = await browser.storage.local.get(["dark"]);
//   // TODO send message to set badge text
//   if (isEnabled.dark === "ON") {
//     loadDarkMode();
//   } else {
//     removeDarkMode();
//   }
// })();

// function loadDarkMode() {
//   const isDarkMode = window.location.search;

//   if (!isDarkMode.includes("vector")) {
//     const newUrl =
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname +
//       (window.location.search === ""
//         ? "?useskin=vector"
//         : window.location.search + "&useskin=vector") +
//       window.location.hash;

//     window.location.replace(newUrl);
//   }
// }

// function removeDarkMode() {
//   let searchData;

//   if (window.location.search.includes("vector")) {
//     searchData = window.location.search.replace(/[&?]useskin=vector/, "");

//     const newUrl =
//       window.location.protocol +
//       "//" +
//       window.location.host +
//       window.location.pathname +
//       (searchData ?? window.location.search) +
//       window.location.hash;

//     window.location.replace(newUrl);
//   }
// }

// browser.runtime.onMessage.addListener(function (request, sender, response) {
//   if (request.colorMode === "OFF") {
//     removeDarkMode();
//   } else if (request.colorMode === "ON") {
//     loadDarkMode();
//   }
// });
