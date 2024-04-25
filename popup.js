document.addEventListener("DOMContentLoaded", async () => {
    const saveButton = document.getElementById("saveButton");
    const repositoryNameInput = document.getElementById("repositoryName");
    const selectedTextInput = document.getElementById("selectedText");

    chrome.runtime.sendMessage({ type: "getStartupData" }, (response) => {
        selectedTextInput.value = response.selectedText || "";
        repositoryNameInput.value = response.repositoryName || "";
    });

    saveButton.addEventListener("click", () => {
        const repositoryName = repositoryNameInput.value.trim();
        const selectedText = selectedTextInput.value;

        const effectiveRepositoryName = repositoryName === "" ? "githubnext/blank" : repositoryName;
        if (selectedText) {
            const url = `https://copilot-workspace.githubnext.com/${effectiveRepositoryName}?task=${encodeURIComponent(selectedText)}`;
            chrome.tabs.create({ url });

            chrome.runtime.sendMessage({ type: "saveRepositoryName", repositoryName });
            chrome.runtime.sendMessage({ type: "closeWindow" });
        }
    });
});
