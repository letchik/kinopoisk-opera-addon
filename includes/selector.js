opera.extension.onmessage = function( event ){
	if( event.data == "getSelection" ){
		background = event.source;
		background.postMessage({action:"setSelection",text:window.getSelection().toString()});
	}
}