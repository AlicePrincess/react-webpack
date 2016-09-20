const mobile = {
	isAndroid: function() {
		return !!navigator.userAgent.match(/Android/i);
	},
	isBlackBerry: function() {
		return !!navigator.userAgent.match(/BlackBerry/i);
	},
	isiOS: function() {
		return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	isOpera: function() {
		return !!navigator.userAgent.match(/Opera Mini/i);
	},
	isWindows: function() {
		return !!navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (mobile.isAndroid() || mobile.isBlackBerry() || mobile.isiOS() || mobile.isOpera() || mobile.isWindows());
	}
}

const isTouchDevice = function(){
	return !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0))
}

export default {
	mobile,
	isTouchDevice
}