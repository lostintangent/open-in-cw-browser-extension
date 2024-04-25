chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInWorkspace",
    title: "Open in Copilot Workspace",
    contexts: ["selection"]
  });
});

let selectedText = null;
let visibleWindowId = null;
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "openInWorkspace") {
    selectedText = info.selectionText;
    await chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 350
    }, ({ id }) => {
      visibleWindowId = id;
    });
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === visibleWindowId) {
    selectedText = null;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getSelectedText") {
    if (selectedText) {
      sendResponse(selectedText);
    } else {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          world: "MAIN",
          func: () => {
            return window.getSelection().toString(); 
          },
        }, (result) => {
          sendResponse(result[0].result);     
        });
      });
    }
  }
  return true;
});