var stache = {};

stache.init = function(){
	$('#Upload').click({
		stache.uploadPhoto();
	})
}
stache.uploadPhoto = function(){
	var photo = stache.getImage();
	var title = $("#Title").val();
	
	data = {tags : "stacheyourstache, uploads", photo : photo, title : title, dateUploaded : DateTime.now()};
	$.ajax({
		url: "http://current.openphoto.me/photo/upload.json",
		data: JSON.stringify(data),
		type: "POST"	
	});
};

stache.getImage = function(){
	
	var photo = $("#photo");
	var file = photo.files[0];
	return file.getAsBinary();
};

