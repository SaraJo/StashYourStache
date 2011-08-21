var stache = {};


stache.uploadPhoto = function(){
var photo = stache.getImage();
var title = $("#Title").val();
data = {tags : "stacheyourstache, uploads", title : title, photo : base64.encode(photo), dateUploaded : new Date()};
$.ajax({
		url:"http://localhost:8888/process.php",
		data: JSON.stringify(data),
		type: "POST",
		success: function(json)
		{
			alert(json);
		}
	}); 
}
	
/*	$.ajax_postup({url:"http://current.openphoto.me/photo/upload.json",
	               file_ele_ids: photo,
	               data: data,
	               success:function(json)
	               {
						alert(json);      
	               }
	}); */
	
		
//};
/*
new AjaxUpload("upload", {
 action: 'http://localhost/~sarajchipps/process.php',
 name: 'file'
 onSubmit: function() {
  alert("Uploading...");
 },
 onComplete: function(file, response) {
  if (response == "error: check file type and size") {
   alert("Error, please only upload images and keep them under 2mb.");
  } else if (response == "error: domain not available") {
   alert("Sorry, the server seems to be offline at the moment. Try again later.");
  } else {
   alert(response);
 }
}); */

stache.getImage = function(){
	
   var photo = document.getElementById("Photo");
    var file = photo.files[0];
	return file;
};

stache.editImage = function(){
	
	$.ajax({
		url: "http://api.face.com/faces/detect.json?api_key=ab5dd4906718dd16ac0e406fc71e633b&api_secret=2e8b6c8cb038a46636f6c2c5ba4b5793&urls=http://www.justpressplay.net/images/stories/downey-mustache.jpg",
		crossDomain: true,
		dataType:'jsonp',
		success:function(data){
			console.log(data);
			stache.doTheMaths(data);
		}

		
	});
}

//http://cartonapi.aviary.com/services/ostrich/render?api_key=aviarytest&app_version=1.0&backgroundcolor=&calltype=render&cellheight=100&cellwidth=100&cols=2&filepath=http%3a%2f%2fec2-75-101-211-180.compute-1.amazonaws.com%2frender%2fa19c3f6b-3c07-4c10-873f-aaacfdce5fbf.jpg&filterid=21&format=png&hardware_version=1&platform=web&quality=100&renderparameters=&rows=2&scale=1&software_version=1&ts=1306684814.85797&version=0.2&api_sig=b44580addf49e776d13560020bbb95c6
//http://cartonapi.aviary.com/services/util/getTime?api_key=aviarytest&app_version=1&hardware_version=1&platform=web&software_version=1&ts=1306527442.49641&api_sig==41f5248d878a5d78f507d6b4b629f458
//http://cartonapi.aviary.com/services/util/getTime?api_key=aviarytest&app_version=1&hardware_version=1&platform=web&software_version=1&ts=1306527442.49641&api_sig=41f5248d878a5d78f507d6b4b629f458
stache.doTheMaths = function(data){
	var x_cor = data.photos[0].tags[0].mouth_left.x;
	var y_cor = data.photos[0].tags[0].mouth_left.y;
	var x1_cor = data.photos[0].tags[0].mouth_right.x;
	var x1_cor = data.photos[0].tags[0].mouth_right.y;
	var size = x1_cor - x_cor;
	var ratio = size / 750;
	stache.sendTheNumbers(x_cor, y_cor, ratio);
	
}

stache.sendTheNumbers = function(x, y, ratio){
	var ts = Date.now() / 1000;
	var filepath = "http://www.justpressplay.net/images/stories/downey-mustache.jpg";
	var renderString = '<parameter><parameter id="Watermark URL" value="http://christinalutters.com/files/clean.png" /><parameter id="Base64 Encoded Watermark" value="" /><parameter id="Horizontal Align" value="right" /><parameter id="Vertical Align" value="bottom" /><parameter id="Horizontal Padding" value="' + x + '" /><parameter id="Vertical Padding" value="' + y +'" /><parameter id="Watermark Scale Factor" value="' + ratio + '" /><parameter id="Transparency" value="1" /><parameter id="Blend Mode" value="normal" /></parameters>"';
//	var hash = hex_md5("4eafc6cf9api_key2f4a837cdapp_version1calltyperendercellheight100cellwidth100cols1filepath" + filepath + "filterid32formatjpghardware_version1platformhtmlquality100renderparameters" + renderString + "rows1scale" + ratio + "software_version1ts" + ts + "version0.2");
	var hash = hex_md5("4eafc6cf9api_key2f4a837cdapp_version1.0hardware_version1.0platformhtmlsoftware_version1.0ts" + ts);
	console.log(hash);
	var param = { "api_sig" : hash, "hardware_version" : "1.0", "calltype" : "render", "api_key" : "2f4a837cd", "ts" : (Date.now() / 1000), "app_version" : "1.0", "format" : "jpg", "software_version" : "1", "quality" : 100, "scale" : ratio, "filepath" : "http://www.justpressplay.net/images/stories/downey-mustache.jpg", "filterid" : 32, "cols" : 1, "rows" : 1, "cellheight" : 100, "cellwidth" : 100, "platform" : "html", "version" : "0.2", "renderparameters" :  renderString}; 
	
	$.ajax({
		url: "http://cartonapi.aviary.com/services/util/getTime?api_key=2f4a837cd&app_version=1.0&hardware_version=1.0&platform=html&software_version=1.0&ts=" + ts + "api_sig=" + hash,
		crossBrowser: true,
		dataType :"jsonp",
		success: function(data){
			alert(data);
		}
	});
}

stache.init = function(){
	$(document).ready(function(){
		$('#Upload').click(function(){
			stache.uploadPhoto();
		});
		$('#Filter').click(function(){
			stache.editImage();
		});
	});
}

stache.init();