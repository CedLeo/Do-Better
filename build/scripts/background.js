chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get(["webNames"], function (result) {
    const webNames = result.webNames || [];
    console.log(webNames);
    for (const webName of webNames) {
      if (tab.url.includes(webName)) {
        // Send a message to the content script to execute it
        // chrome.scripting.executeScript({
        //   target: { tabId: tabId },
        //   function: () => {
        //     // Send a message to the content script to execute it
        //     chrome.runtime.sendMessage({ action: "executeContentScript" });
        //   },
        // });
        console.log("it works");
        alert("Scanning website works.");
        break;
      }
    }
  });
});
