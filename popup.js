document.addEventListener("DOMContentLoaded", async () => {
    const saveButton = document.getElementById("saveButton");
    const repositoryNameInput = document.getElementById("repositoryName");
    const selectedTextInput = document.getElementById("selectedText");

    chrome.runtime.sendMessage({ type: "getStartupData" }, (response) => {
        selectedTextInput.value = response.selectedText || "";
        repositoryNameInput.value = response.repositoryName || "";
    });

    saveButton.addEventListener("click", () => {
        const repositoryName = repositoryNameInput.value;
        const selectedText = selectedTextInput.value;

        chrome.runtime.sendMessage({ type: "saveRepositoryName", repositoryName: repositoryName });

        if (repositoryName && selectedText) {
            const url = `https://copilot-workspace.githubnext.com/${repositoryName}?task=${encodeURIComponent(selectedText)}`;
            chrome.tabs.create({ url });
        }
    });
});
