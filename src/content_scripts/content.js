const loadDarkMode = () => {
  console.log("LOAD DARK MODE");
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

const removeDarkMode = () => {
  console.log("REMOVE DARK MODE");
  let searchData;
  window.alert("fucking");

  if (window.location.search.includes("vector")) {
    searchData = window.location.search.replace(/[&?]useskin=vector/, "");

    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }${searchData ?? window.location.search}${window.location.hash}`;

    window.location.replace(newUrl);
  }
};

browser.runtime.onMessage.addListener((data) => {
  console.log("CONTENT LISTENER");
  if (data === "light") {
    removeDarkMode();
    return false;
  }
  loadDarkMode();

  return false;
});
