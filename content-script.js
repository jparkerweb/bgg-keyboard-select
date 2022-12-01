
if (window.location.href.indexOf('https://boardgamegeek.com/subscriptions') == 0) {
	console.log("---------> 💉 injecting script for Forum Subscriptions")
	_script = document.createElement('script');
	_script.setAttribute('src', chrome.runtime.getURL('injectList.js'));
	(document.head||document.documentElement).appendChild( _script  );
	_script.parentNode.removeChild( _script);
} else if (window.location.href.indexOf('https://boardgamegeek.com/thread') == 0) {
	console.log("---------> 💉 injecting script for Forum Thread")
	_script = document.createElement('script');
	_script.setAttribute('src', chrome.runtime.getURL('injectThread.js'));
	(document.head||document.documentElement).appendChild( _script  );
	_script.parentNode.removeChild( _script);
}
