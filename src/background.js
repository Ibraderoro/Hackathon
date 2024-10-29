chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'youtube' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.runtime.onMessage.addListener((message) => {
	let url = 'http://localhost:4000/download?';
    // let url = '';
	let queryString = Object.keys(message).map(key => key + '=' + message[key]).join('&');
	url += queryString;
	console.log(url);
	chrome.downloads.download({url:url,
		filename: message.filename + '.' + message.format
	}, function (downID) {
		console.log("function is running")
		if (chrome.runtime.lastError) {
			console.error("Download failed:", chrome.runtime.lastError.message);
		} else {
			chrome.downloads.show(downID);
		}
	});
});
