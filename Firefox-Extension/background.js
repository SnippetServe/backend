//Add actionlistener to the browser tab
browser.tabs.onUpdated.addListener(tabId => {
    initialize(tabId);
});

function initialize(tabId){
    browser.pageAction.setIcon({
        tabId: tabId,
        path: "icons/border-48.png"
    })
    browser.pageAction.setTitle({
        tabId: tabId,
        title: "Snippet Collector"
    });
    browser.pageAction.show(tabId);
    browser.pageAction.setPopup({
        tabId: tabId,
        popup: "popup/index.html"
    })
}

//(Seperate thing ignore this)
//Create a context menu
browser.contextMenus.create({
    id: "soH",
    title:"Search on Heroku",
    contexts: ["selection"]
});

//Add actionlistener to the context menu 
browser.contextMenus.onClicked.addListener(contextMenuAction);
function contextMenuAction(info, tab){
    const url = "https://getcode.herokuapp.com/api/snippet/" + info.selectionText;
    browser.tabs.create({url: url});
}