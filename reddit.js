function removePromoted() {  
    let postsClass = "rpBJOHq2PR60pnwJlUyP0";
    let posts = document.getElementsByClassName(postsClass);
    if (posts.length > 0) {
        for (const child of posts[0].children) {
            if (child.children[0].children[0]) {
                if (child.children[0].children[0].children[0].id.substring(0, 4) == "t3_z") {
                    child.children[0].children[0].children[0].style.display = "none";
                }
            }
        }
    }
}


chrome.storage.local.get().then((result) => {
    try {
        if (result.mode) {
            let leftSidebarSelector = "#AppRouter-main-content > div._20fGT0XJD3MvX9yBsVeKMn.zoWOQnp55WuhEugRSwfw1";
            if (document.querySelector(leftSidebarSelector)) {
                document.querySelector(leftSidebarSelector).style.display = "none"; 
            }
            
            window.addEventListener("load", removePromoted);
        }
    } catch(err) {
        console.log(err);
    }
});
