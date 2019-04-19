var popup = null;
var button;
opera.extension.onmessage = function( event ){
	data = event.data;
	switch(data.action)
	{
		case "getRating":
			popup = event.source;
			var tab = opera.extension.tabs.getFocused();
			if( tab )
				tab.postMessage( "getSelection");
			break;
		case "setSelection":
			if (!popup||!data.text)
				return;
			//button.popup.width = data.text.length*10;
			getKinopoiskRating(data.text);
			getIMDBRating(data.text);
			//ratings.push(getIMDBRating(data.text));
			break;
	};
};
function getKinopoiskRating(title)
{
	var rating = new Object();
	url = 'http://s.kinopoisk.ru/search/chrometoolbar.php?v=1&query='+encodeURIComponent(title.trim());
	xht = new XMLHttpRequest();
	xht.onreadystatechange = function (e){				
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText != null){
				var response = JSON.parse(this.responseText);
				if (response.type != "film")
					return null;
				ready = '<div >'+
					'<img src="icons/kinopoisk.png" style="float:left;margin-right:4px;" />'+
				'<div style="float:left;font-size:23px;line-height:32px;margin-right:4px;color:#cb0018;text-align:left;font-weight:bold;">'+response.rating.replace(',','.')+'</div>'+
				'<div style="height:34px;">';
				if (response.name == '')
					ready += '<div style="font-size:14px;font-weight:bold;color:#000077;">'+response.rus+'</div>';
				else
					ready += '<div style="font-size:14px;font-weight:bold;color:#000077;">'+response.name+'</div>'+
						'<div style="font-size:11px;font-weight:bold;color:gray;color:#999;">'+response.rus+'</div>';
				ready +='</div>';
				ready +='<div style="margin:0px;background: #999;display: inline-block; vertical-align: middle; width: 150px; height: 15px; overflow: hidden;  text-align: left; position: relative;">'+
					'<img height="16" width="150" style="position: relative; z-index: 1;" src="icons/stars.png" />'+
					'<div style="background: #e60007; height: 15px; position: relative; top: -18px; z-index: 0;width:'+parseFloat(response.rating)*10+'%">'+
					'</div></div></div>';
				popup.postMessage({action:"showRating",content:ready});
				//button.popup.height += 70;
			}
		}
	};
	xht.open("GET", url);
	xht.send();
};
function getIMDBRating(title)
{
	var rating = new Object();
	url = 'http://imdbapi.com/?t='+encodeURIComponent(title.trim());
	opera.postError(url);
	xht = new XMLHttpRequest();
	xht.onreadystatechange = function (e){				
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText != null){
				var response = JSON.parse(this.responseText);
				ready = '<div >'+
					'<img src="icons/kinopoisk.png" style="float:left;margin-right:4px;" />'+
				'<div style="float:left;font-size:23px;line-height:32px;margin-right:4px;color:#cb0018;text-align:left;font-weight:bold;">'+response.Rating.replace(',','.')+'</div>'+
				'<div style="height:34px;">';
					ready += '<div style="font-size:14px;font-weight:bold;color:#000077;">'+response.Title+'</div>';
				ready +='</div>';
				ready +='<div style="margin:0px;background: #999;display: inline-block; vertical-align: middle; width: 150px; height: 15px; overflow: hidden;  text-align: left; position: relative;">'+
					'<img height="16" width="150" style="position: relative; z-index: 1;" src="icons/stars.png" />'+
					'<div style="background: #e60007; height: 15px; position: relative; top: -18px; z-index: 0;width:'+parseFloat(response.Rating)*10+'%">'+
					'</div></div></div>';
				popup.postMessage({action:"showRating",content:ready});
				//button.popup.height += 70;
			}
		}
	};
	xht.open("GET", url);
	xht.send();
};
var buttonProperties = {
	title: "Рейтинг фильмов",
	icon: "icons/rater.png",
	popup: {
		href: "popup.html",
		width: 250,
		height: 80
	}
}
button = opera.contexts.toolbar.createItem(buttonProperties);
opera.contexts.toolbar.addItem(button);