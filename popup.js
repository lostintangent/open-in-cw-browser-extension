document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const repositoryNameInput = document.getElementById('repositoryName');

    saveButton.addEventListener('click', () => {
        chrome.storage.local.get(['selectedText'], (result) => {
            const selectedText = result.selectedText;
            const repositoryName = repositoryNameInput.value;

            if (repositoryName && selectedText) {
                const url = `https://copilot-workspspace.githubnext.com/${repositoryName}?task=${encodeURIComponent(selectedText)}`;
                chrome.tabs.create({ url });
            }
        });
    });
});
