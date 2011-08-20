var stache = {};

stache.uploadPhoto = function(){
	photo = stache.getImage();
	
}

stache.getImage = function(){
	
	var photo = $("#photo");
	var file = photo.files[0];
	return Base64.encode(file);
}