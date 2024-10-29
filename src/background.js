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
  let queryString = Object.keys(message)
    .map((key) => key + '=' + message[key])
    .join('&');
  url += queryString;
  console.log(url);
  chrome.downloads
    .download({
      url: url,
      filename: 'YoutubeDownloader/' + message.filename + '.' + message.format,
    })
    .then((downID) => {
      chrome.downloads.show(downID);
    })
    .catch((error) => console.error('Download failed: ', error));
});
