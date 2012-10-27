(function($) {

/**
 * $(selector).table(args);
 */
$.fn.extend({
	table: function(params) {
		//デフォルトパラメータ
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
