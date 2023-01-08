chrome.storage.local.get().then((result) => {
    try {
        if (result.mode) {
            let hotQuestionsID = "hot-network-questions";
            document.getElementById(hotQuestionsID).style.display = "none"; 
    
            let newsSelector = "#sidebar > div.s-sidebarwidget.s-sidebarwidget__yellow.s-anchors.s-anchors__grayscale.mb16"
            document.querySelector(newsSelector).style.display = "none"; 
        }
    } catch(err) {
        console.log(err);
    }
});
