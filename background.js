chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInWorkspace",
    title: "Open in Workspace",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "openInWorkspace") {
    const selectedText = info.selectionText;
    await chrome.storage.local.set({ selectedText });
    chrome.action.openPopup();
  }
});
