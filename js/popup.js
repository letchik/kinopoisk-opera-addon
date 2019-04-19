window.addEventListener("load",function (event)
{
	opera.extension.postMessage({action:"getRating"});
},false);

opera.extension.onmessage = function ( event ){
	data = event.data;
	if( data.action == "showRating" ){
		opera.postError("gotaction");
		opera.postError(data.content);
		waiter = document.getElementById('waiter');
		if (waiter)
			waiter.parentNode.removeChild(waiter);
		document.getElementById('body').innerHTML += data.content;
	}
}
