chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInWorkspace",
    title: "Open in Workspace",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openInWorkspace") {
    const selectedText = info.selectionText;
    chrome.storage.local.set({ selectedText }, () => {
      chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400,
        height: 200
      });
    });
  }
});
