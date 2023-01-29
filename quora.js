const styles = `
    .related-button {
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

    .related-button:before {
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

    .related-button:active {
        color: #000
    }

    .related-button:active:after {
        background: transparent;
    }

    .related-button:hover:before {
        opacity: 1;
    }

    .related-button:after {
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

chrome.storage.local.get().then((result) => {
    try {
        if (result.mode) {            
            console.log("mode on");      
            
            document.head.appendChild(styleSheet);

            //disable sponsored

            let sponsoredInitCheckTimer = setInterval(sponsoredInitCheck, 111);

            function sponsoredInitCheck() {
                let sponsored = document.getElementsByClassName("spacing_log_question_page_ad");
                if (sponsored.length >= 4) {
                    clearInterval(sponsoredInitCheckTimer);
                    
                    for (let i = 0; i < sponsored.length; i++) {
                        console.log(sponsored[i]);
                        sponsored[i].style.display = "none";
                    }
                }
            }

            //add button for related

        }
    } catch(err) {
        console.log(err);
    }
});
