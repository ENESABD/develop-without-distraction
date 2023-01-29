const styles = `
    .comments-button {
        width: 220px;
        height: 50px;
        border: none;
        outline: none;
        color: #fff;
        background: #111;
        cursor: pointer;
        position: relative;
        z-index: 0;
        border-radius: 10px;
    }

    .comments-button:before {
        content: '';
        background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
        position: absolute;
        top: -2px;
        left:-2px;
        background-size: 400%;
        z-index: -1;
        filter: blur(5px);
        width: calc(100% + 4px);
        height: calc(100% + 4px);
        animation: glowing 20s linear infinite;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        border-radius: 10px;
    }

    .comments-button:active {
        color: #000
    }

    .comments-button:active:after {
        background: transparent;
    }

    .comments-button:hover:before {
        opacity: 1;
    }

    .comments-button:after {
        z-index: -1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #111;
        left: 0;
        top: 0;
        border-radius: 10px;
    }

    @keyframes glowing {
        0% { background-position: 0 0; }
        50% { background-position: 400% 0; }
        100% { background-position: 0 0; }
    }
`

const styleSheet = document.createElement("style");
styleSheet.innerHTML = styles;
styleSheet.id = "develop-without-distractions";

function changeContent(elementsWithSameClass) {
    document.head.appendChild(styleSheet);

    let sideContent = elementsWithSameClass.namedItem("secondary");
    if (sideContent) {
        sideContent.style.display = "none";
    }
    
    //for vertical screens
    let belowContent = elementsWithSameClass.namedItem("related");
    if (belowContent) {
        belowContent.style.display = "none";
    }

    //comments
    let comments = elementsWithSameClass.namedItem("comments");
    if (comments) {
        comments.style.display = "none";

        //toggle
        function toggleCommentVisibility() {
            if (comments.style.display == "none") {
                comments.style.display = "block";
                commentsButton.removeChild(commentsButton.firstChild);
                commentsButton.appendChild(document.createTextNode("Hide Comments"));
            } else {
                comments.style.display = "none"
                commentsButton.removeChild(commentsButton.firstChild);
                commentsButton.appendChild(document.createTextNode("Show Comments"));
            }
        }

        const commentsButton = document.createElement("button");
        commentsButton.appendChild(document.createTextNode("Show Comments"));
        commentsButton.className = "comments-button";
        commentsButton.addEventListener("click", toggleCommentVisibility);
        document.getElementById("below").insertBefore(commentsButton, comments);
    }

    console.log("length: ", elementsWithSameClass.length, "side: ", sideContent, "below: ", belowContent, "comments: ", comments);
}


function removeDistractions() {
    try {
        console.log("function called");

        //check if suggestions have been loaded
        let suggestionsInitCheckTimer = setInterval(suggestionsInitCheck, 111);

        function suggestionsInitCheck() {
            let elementsWithSameClass = document.getElementsByClassName("style-scope ytd-watch-flexy");

            if (elementsWithSameClass.length > 0) {
                clearInterval(suggestionsInitCheckTimer);
                changeContent(elementsWithSameClass);
            }
        }
    } catch(err) {
        console.log(err);
    }
}

chrome.storage.local.get().then((result) => {
    try {
        console.log("script enjected");
        console.log("mode: ", result.mode);
        
        if (result.mode) {
            window.addEventListener("load", removeDistractions);
        }
    } catch(err) {
        console.log(err);
    }
});
