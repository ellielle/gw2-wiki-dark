# GW2 Wiki Dark Mode

This simple extension automatically sets the color theme for the [official GW2 wiki](https://wiki.guildwars2.com/wiki/Main_Page) to their Vector dark theme without needing to be logged in. 

<br>

# Installation

## Firefox

The addon can be [downloaded from its extension page](https://addons.mozilla.org/en-US/firefox/addon/gw2-wiki-dark-mode/). 

## Chrome

> Note: The Chrome extension isn't available on the store yet.

<details>
<summary>If you want to install and use anyway:</summary>
<br>
For each new release:

1. Download the most current release, make sure to download ```gw2-wiki-dark-chrome.zip```. Extract the files into an empty folder.

2. In Chrome, go to ```chrome://extensions``` in your browser. In the top right, enable Developer Mode, and click "Load Unpacked Extension". Select the folder holding the files.

3. After installation, make sure the extension is enabled. Reload any GW2 Wiki pages currently open.

4. You may delete the folder and ```.zip``` file now. 
</details>

## UserScript

If you don't want to install an extension, a more simple userscript can [can be found here](https://gist.github.com/ellielle/e9182e1822d089122db9c8f6981f4ba5).

1. Open the gist page and click the "Raw" button. 

2. If your UserScript extension doesn't pop up to install the script, copy and paste all of it into a new user script. Save and enable it.

## Known Issues

* After installation, any previously open GW2 Wiki tabs need to be refreshed so the extension knows about them.

* Only works on the English wiki currently.

# Building

To build the extension for yourself:

1. Clone the repository using git: `git clone https://github.com/ellielle/gw2-wiki-dark.git`

    - If you are new to or unfamiliar with git, reference GitHub's article on [cloning a repository](https://help.github.com/en/articles/cloning-a-repository).

2. Run `pnpm install` to install the Node packages.
    - If you don't have `pnpm`, [you can install it](https://pnpm.io/installation) a number of ways.

3. Run `pnpm build`, or `pnpm build:firefox`, to build the extension. The extension will need to be refreshed for changes to be reflected in the browser. Alternatively, you can run `pnpm dev` or `pnpm dev:firefox` to build the extension, and then have the dev server watch for changes in code to rebuild it.

4. To test the built extension:
    
    - Chrome:
      1. Go to ```chrome://extensions``` in your browser. In the top right, enable Developer Mode, and click "Load Unpacked Extension". 
      2. Select the `extension` folder in the root project directory.

    - Firefox: 
      1. Run `pack:xpi` to create `gw2-wiki-dark.xpi`. 
      2. Go to `about:config` and set `xpinstall.signatures.required` to false.
      3. Go to `about:debugging#/runtime/this-firefox`, click the `Load Temporary Add-On` in the upper right of the section. Select `gw2-wiki-dark.xpi`.

> If using WSL2, see their [documentation on WSL2 with GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps). 

> Note: Addons for Firefox need to be signed by Mozilla. You can sign it for self-distribution or adding to AMO [on their submission site](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).

---

Icon created by [/u/sylint19 on Reddit](https://www.reddit.com/r/Guildwars2/comments/cy7h5l/guild_wars_2_icebrood_saga_desktop_icons/) and used with permission.
