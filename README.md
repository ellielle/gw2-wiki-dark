# GW2 Wiki Dark Mode

This extension automatically sets the color theme for the [official GW2 wiki](https://wiki.guildwars2.com/wiki/Main_Page) to their Vector dark theme without needing to be logged in.

I was tired of the default skin hurting my eyes at night, and didn't want to have to make an account.

> If you are on a version lower than `0.3.0`, I recommend updating. This extension no longer needs to be built and is no longer in TypeScript.

<br>

<div align="center">
   <img src="https://addons.mozilla.org/user-media/previews/full/285/285709.png?modified=1690992574" width="800">
</div>

# Installation

## Firefox

The addon can be [downloaded from its extension page](https://addons.mozilla.org/en-US/firefox/addon/gw2-wiki-dark-mode/).

Alternatively, you can download the most recent file from the [Releases](https://github.com/ellielle/gw2-wiki-dark/releases) page. Install it by going to `about:addons`, clicking the cog in the upper right of the screen, and selecting `Install Add-On From File`.

After installation, navigate to [a wiki page](https://wiki.guildwars2.com) and enable `Always Allow on wiki.guildwars2.com`.

<div align="center">
   <img src="https://i.imgur.com/yD1ncPZ.png" alt="allow permissions">
</div>

This will allow the addon to communicate to each wiki tab you may have open, to change your preference between dark/light.

## Chrome

The addon can be [downloaded from the Chrome store](https://chromewebstore.google.com/detail/gw2-wiki-dark-mode/mbjneadfmioclhiklaeimpaoggmgnnji)

> See below issue about the Chrome version

## UserScript

If you don't want to install an extension, a more simple userscript can [can be found here](https://gist.github.com/ellielle/e9182e1822d089122db9c8f6981f4ba5).

1. Open the gist page and click the "Raw" button.

2. If your UserScript extension doesn't pop up to install the script, copy and paste all of it into a new user script. Save and enable it.

## Known Issues

- Only works on the English wiki currently.

- Mangles some urls

- The mode can't be toggled using the action button in the Chrome version. It will need to be disabled when you don't want dark mode.

# Build

To build the extension for yourself:

1. Clone the repository using git:

```bash
git clone https://github.com/ellielle/gw2-wiki-dark.git
cd gw2-wiki-dark
```

2. Make a `zip` archive of the `src` folder and `manifest.json`

Firefox:

3. Install it by going to `about:addons`, clicking the cog in the upper right of the screen, and selecting `Install Add-On From File`, and using the archive you just made.

<div align="center">
   <img src="https://i.imgur.com/dd6xgcY.png">
</div>

Chrome:

3. Clone the Chrome repository using git: `git clone -b chrome https://github.com/ellielle/gw2-wiki-dark.git`

4. Install by going to `chrome:extensions`, clicking `Load unpacked`, and selecting the folder you cloned into.

<div align="center">
   <img src="https://i.imgur.com/ZFHbKQJ.png">
</div>

> If using WSL2, see their [documentation on WSL2 with GUI apps](https://learn.microsoft.com/en-us/windows/wsl/tutorials/gui-apps).

> Note: Addons for Firefox need to be signed by Mozilla. You can sign it for self-distribution or adding to AMO [on their submission site](https://addons.mozilla.org/en-US/developers/addon/submit/distribution).

---

Icon created by [/u/sylint19 on Reddit](https://www.reddit.com/r/Guildwars2/comments/cy7h5l/guild_wars_2_icebrood_saga_desktop_icons/), used and altered with permission.

## Contributing

If you would like to contribute, please fork the repository and open a pull request to the `main` branch. Follow the above instructions in [Build](#build).
