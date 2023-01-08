document.getElementById("modeLabel").addEventListener("click", toggleMode);

chrome.storage.local.get().then((result) => {
    document.getElementById("mode").checked = result.mode;
});

function toggleMode() {
    chrome.storage.local.set({ mode: document.getElementById("mode").checked }).then(() => {
        //console.log("Value is set to " + document.getElementById("mode").checked);
    });
}