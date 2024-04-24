# Open in Workspace Chrome Extension

This repository now hosts a Chrome extension that enhances your browsing experience by allowing you to select text on any webpage, right-click it, and choose an "Open in Workspace" option. This action triggers a popup asking for the GitHub repository name related to the selected task.

Additionally, you can now use the browser action button to trigger the same functionality without needing to use the context menu. Simply click on the extension's icon in the browser toolbar after selecting text on a webpage.

## Installation

To install the extension:
1. Download the extension files from this repository.
2. Open the Chrome browser and navigate to `chrome://extensions/`.
3. Enable Developer Mode by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the downloaded extension directory.

## Usage

To use the extension through the context menu:
1. Select text on any webpage.
2. Right-click the selected text to open the context menu.
3. Click on the "Open in Workspace" option.
4. A popup will appear asking for the GitHub repository name. Enter the name in the text box provided.
5. Click the save button. This will open a new tab to `https://copilot-workspspace.githubnext.com/<repository>?task=<selectedText>`, where `<repository>` is the GitHub repository name you entered, and `<selectedText>` is the text you had selected.

To use the extension through the browser action button:
1. Select text on any webpage.
2. Click on the extension's icon in the browser toolbar.
3. The popup will appear with the selected text already filled in. Enter the GitHub repository name in the text box provided.
4. Click the save button. This will open a new tab to `https://copilot-workspspace.githubnext.com/<repository>?task=<selectedText>`, where `<repository>` is the GitHub repository name you entered, and `<selectedText>` is the text you had selected.

Enjoy the seamless integration of your browsing and Copilot Workspace!
