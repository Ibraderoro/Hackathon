console.log('im here');
window.onload = function () {
  let quality = document.getElementById('quality');
  let filename = document.getElementById('filename');
  let format = document.getElementById('format');
  let dButton = document.getElementById('download');

  // 	dButton.onclick = function(){
  // 		console.log("button  clicked");
  // 		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  // 	    	let url = tabs[0].url;
  // 	    	let message  = {
  // 	    		'url' : url,
  // 	    		'quality': quality.value,
  // 	    		'filename': filename.value,
  // 	    		'format': format.value
  // 	    	};
  // 	    	chrome.runtime.sendMessage(message);
  // 		});
  // 	};
  // }

  dButton.onclick = function () {
    console.log('button clicked');
    dButton.innerText = 'Downloading file...';
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, (tab) => {
      console.log(tab);
      let url = tab[0].id;
      let message = {
        url: url,
        quality: quality.value,
        filename: filename.value,
        format: format.value,
      };
      chrome.runtime.sendMessage(message);
    });
  };
};
