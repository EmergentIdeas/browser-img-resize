var resizeImage = function(/*image or base64 encoded data of image*/ imageData, maxSize, quality) {
	try {
		quality = quality || .7
		maxSize = maxSize || 1920;
		var resizeImg 
		if(imageData instanceof Image) {
			resizeImg = imageData
		}
		else {
			resizeImg = new Image();
			resizeImg.src = imageData;
		}
		
		var resizeCanvas = document.createElement('canvas');
		resizeCanvas.width = 1920;
		resizeCanvas.height = 1200;
		
		var ctx = resizeCanvas.getContext('2d');
		ctx.clearRect(0, 0, resizeCanvas.width, resizeCanvas.height);
		
		if(resizeImg.naturalWidth <= maxSize && resizeImg.naturalHeight <= maxSize) {
			if(typeof imageData == 'string') {
				return imageData;
			}
			else if(imageData instanceof Image) {
				var url = imageData.src;
				if(url.startsWith('data:')) {
					return imageData.src
				}
			}
		}
		
		if(resizeImg.naturalWidth >= resizeImg.naturalHeight) {
			resizeCanvas.width = maxSize;
			var ratio = resizeImg.naturalWidth / maxSize;
			var newHeight = resizeImg.naturalHeight / ratio;
			resizeCanvas.height = newHeight;
		}
		else {
			resizeCanvas.height = maxSize;
			var ratio = resizeImg.naturalHeight / maxSize;
			var newWidth = resizeImg.naturalWidth / ratio;
			resizeCanvas.width = newWidth;
		}
		
		ctx.drawImage(resizeImg, 0, 0, resizeCanvas.width, resizeCanvas.height);
		var data = resizeCanvas.toDataURL('image/jpeg', quality);
		return data;
	} catch(e) {
		if(console && console.log) {
			console.log('error resizing image: ' + e);
		}
		return imageData;
	}
}

module.exports = resizeImage