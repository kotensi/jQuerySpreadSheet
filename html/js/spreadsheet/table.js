(function($) {

/**
 * $(selector).table(args);
 */
$.fn.extend({
	table: function(params) {
		//�f�t�H���g�p�����[�^
		params = $.extend({

		}, params);

		var table = new Table(this, params);
	}

});

function Table(rootNode, params) {
	this._rootNode = rootNode;
	this._params = params;

}

})(jQuery);
