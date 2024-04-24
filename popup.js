document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const repositoryNameInput = document.getElementById('repositoryName');
    const selectedTextInput = document.getElementById('selectedText');

    chrome.storage.local.get(['selectedText'], (result) => {
        const selectedText = result.selectedText;
        selectedTextInput.value = selectedText; // Insert the selected text into the new textarea element

        saveButton.addEventListener('click', () => {
            const repositoryName = repositoryNameInput.value;

            if (repositoryName && selectedText) {
                const url = `https://copilot-workspace.githubnext.com/${repositoryName}?task=${encodeURIComponent(selectedTextInput.value)}`; // Read the selected text from the new textarea before constructing the URL
                chrome.tabs.create({ url });
            }
        });
    });
});
