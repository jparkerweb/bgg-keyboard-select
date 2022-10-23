_script = document.createElement('script');
_script.setAttribute('src', chrome.runtime.getURL('inject.js'));
(document.head||document.documentElement).appendChild( _script  );
_script.parentNode.removeChild( _script);