# GW2 Wiki Dark Mode

This simple extension automatically sets the color theme for the [official GW2 wiki](https://wiki.guildwars2.com/wiki/Main_Page) to their Vector dark theme without needing to be logged in.

If you are on a version lower than `0.3.0`, I recommend updating. This extension no longer needs to be built and is no longer in TypeScript.
<br>

# Installation

## Firefox

The addon can be [downloaded from its extension page](https://addons.mozilla.org/en-US/firefox/addon/gw2-wiki-dark-mode/).

Alternatively, you can download the most recent file from the [Releases](https://github.com/ellielle/gw2-wiki-dark/releases) page. Install it by going to `about:addons`, clicking the cog in the upper right of the screen, and selecting `Install Add-On From File`.

## Chrome

> Note: The Chrome extension isn't available on the store yet.

<details>
<summary>If you want to install and use anyway:</summary>
<br>

1. Download the most current release, make sure to download `gw2-wiki-dark-chrome.zip`. Extract the files into an empty folder.

2. In Chrome, go to `chrome://extensions` in your browser. In the top right, enable Developer Mode, and click "Load Unpacked Extension". Select the folder holding the files.

3. After installation, make sure the extension is enabled. Reload any GW2 Wiki pages currently open.

4. You may delete the folder and `.zip` file now.
</details>

## UserScript

If you don't want to install an extension, a more simple userscript can [can be found here](https://gist.github.com/ellielle/e9182e1822d089122db9c8f6981f4ba5).

1. Open the gist page and click the "Raw" button.

2. If your UserScript extension doesn't pop up to install the script, copy and paste all of it into a new user script. Save and enable it.

## Known Issues

- Only works on the English wiki currently.

# Usage

To build the extension for yourself:

1. Clone the repository using git: `git clone https://github.com/ellielle/gw2-wiki-dark.git`

   - If you are new to or unfamiliar with git, reference GitHub's article on [cloning a repository](https://help.github.com/en/articles/cloning-a-repository).

2. Make a `zip` archive of the `src` folder and `manifest.json`

Firefox:

3. Install it by going to `about:addons`, clicking the cog in the upper right of the screen, and selecting `Install Add-On From File`, and using the archive you just made.

Chrome:

3. You only need the `src` folder and `manifest.json`, the rest can be moved or deleted.

4. Install by going to `chrome:extensions`, clicking `Load unpacked`, and selecting the folder you cloned into.

> If using WSL2, see their [documentation on WSL2 with GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps).

> Note: Addons for Firefox need to be signed by Mozilla. You can sign it for self-distribution or adding to AMO [on their submission site](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).

---

Icon created by [/u/sylint19 on Reddit](https://www.reddit.com/r/Guildwars2/comments/cy7h5l/guild_wars_2_icebrood_saga_desktop_icons/), used and altered with permission.
