document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const repositoryNameInput = document.getElementById('repositoryName');
    const selectedTextInput = document.getElementById('selectedText');

    // Initially disable the text area while loading the selected text
    selectedTextInput.disabled = true;

    // Attempt to read the selected text from storage
    chrome.storage.local.get(['selectedText'], (result) => {
        let selectedText = result.selectedText;
        if (selectedText) {
            selectedTextInput.value = selectedText; // Insert the selected text into the textarea element
            selectedTextInput.disabled = false; // Enable the text area after loading the text
        } else {
            // If no selected text was found in storage, attempt to read it from the current tab
            // Updated to use chrome.scripting API for manifest v3 support
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.scripting.executeScript({
                    func: () => window.getSelection().toString(),
                }, (results) => {
                    selectedText = results[0].result;
                    selectedTextInput.value = selectedText || ''; // Insert the selected text into the textarea element
                    selectedTextInput.disabled = false; // Enable the text area after loading the text
                });
            });
        }

        saveButton.addEventListener('click', () => {
            const repositoryName = repositoryNameInput.value;

            if (repositoryName && selectedText) {
                const url = `https://copilot-workspace.githubnext.com/${repositoryName}?task=${encodeURIComponent(selectedTextInput.value)}`; // Read the selected text from the new textarea before constructing the URL
                chrome.tabs.create({ url });
            }
        });
    });
});
