// (function () {
//   /**
//    * Check and set a global guard variable.
//    * If this content script is injected into the same page again,
//    * it will do nothing next time.
//    */
//   if (window.hasRun) {
//     return;
//   }
// });
// window.hasRun = true;

// TODO: the addon should dark mode new tabs when they open
// will probably need to listen for domloaded event or something similar

// loadDarkMode edits the url of the page to include `useskin=vector`
// and then reloads the page, forcing the GW2 wiki page into
// the built-in dark mode
const loadDarkMode = () => {
  // TODO: need to account for other query parameters and append them after
  if (
    !window.location.search.includes("vector") &&
    window.location.host.includes("wiki")
  ) {
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }${
      window.location.search === ""
        ? "?useskin=vector"
        : `${window.location.search}&useskin=vector`
    }${window.location.hash}`;

    window.location.replace(newUrl);
  }
};

// removeDarkMode removes `useskin=vector` from the url
// and reloads the page, setting the wiki back to the default
// light mode
const removeDarkMode = () => {
  let searchData;

  if (window.location.search.includes("vector")) {
    searchData = window.location.search.replace(/[&?]useskin=vector/, "");

    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }${searchData ?? window.location.search}${window.location.hash}`;

    window.location.replace(newUrl);
  }
};

// Message listener that receives messages from background.js:setColorModeInTabs
// on when to change the color mode
browser.runtime.onMessage.addListener((data) => {
  console.log("data: ", data);
  if (data === "light") {
    removeDarkMode();
    return;
  }
  loadDarkMode();
});
