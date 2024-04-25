document.addEventListener("DOMContentLoaded", async () => {
    const saveButton = document.getElementById("saveButton");
    const repositoryNameInput = document.getElementById("repositoryName");
    const selectedTextInput = document.getElementById("selectedText");

    chrome.runtime.sendMessage({ type: "getSelectedText" }, (selectedText) => {
        selectedTextInput.value = selectedText || "";
        selectedTextInput.disabled = false;
    });

    saveButton.addEventListener("click", () => {
        const repositoryName = repositoryNameInput.value;
        const selectedText = selectedTextInput.value;

        if (repositoryName && selectedText) {
            const url = `https://copilot-workspace.githubnext.com/${repositoryName}?task=${encodeURIComponent(selectedText)}`;
            chrome.tabs.create({ url });
        }
    });
});