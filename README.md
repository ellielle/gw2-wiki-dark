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

To build the extension for yourself, do the following:

1. Clone the repository using git: `git clone https://github.com/ellielle/gw2-wiki-dark.git`

    - If you are new to or unfamiliar with git, reference GitHub's article on [cloning a repository](https://help.github.com/en/articles/cloning-a-repository).

2. Run `pnpm install` to install the Node packages.
    - If you don't have `pnpm`, you can run `npm i -g pnpm` to install the package manager. If you don't have `npm`, reference [Node Version Manager's installtion section](https://github.com/nvm-sh/nvm#installing-and-updating), the recommended way to install Node.js and npm.

3. Run `pnpm dev` to build extension and watch for changes in code to rebuild it. The extension will need to be refreshed/reinstalled for changes to be reflected in the browser. 

4. To test the built extension, you will need either Chrome or [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/).
    
    - Chrome:
      1. Go to ```chrome://extensions``` in your browser. In the top right, enable Developer Mode, and click "Load Unpacked Extension". 
      2. Select the `extension` folder in the root project directory.

    - Firefox: 
      1. Run `build:firefox` and then `pack:zip`. 
      2. Go to `about:config` and set `xpinstall.signatures.required` to false.
      3. Go to `about:addons`, click the cog in the upper right of the section. Click `Install Add-on From File` and select `gw2-wiki-dark.zip`.

> If using WSL2, see their [documentation on WSL2 with GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps). 
    
5. To build the extension for yourself:

    1. Run one of the following build commands depending on your desired browser. The build will be in the `extension` folder.
        - `pnpm build` to build for Chromium.
        - `pnpm build:firefox` to build for Firefox.
    
    2. You can zip the extension folder yourself, or use one of the `pack` commands for the format you need.
        - `pnpm pack:zip` creates a standard zip file.
        - `pnpm pack:xpi` creates a Firefox-specific archive file.
        - `pnpm pack:crx` creates a Chrome-specific archive file.


> Note: Addons for Firefox need to be signed by Mozilla. You can sign it for self-distribution or adding to AMO [on their submission site](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).

---

Icon created by [/u/sylint19 on Reddit](https://www.reddit.com/r/Guildwars2/comments/cy7h5l/guild_wars_2_icebrood_saga_desktop_icons/) and used with permission.
