//(function($) {

/**
 * $(selector).table(args);
 */
$.fn.extend({
	spreadsheet: function(params) {
		//デフォルトパラメータ
		params = $.extend({

		}, params);

		var spreadsheet = new SpreadSheet(this, params);
	}
});

var log = console;
function Component() {
};
Component.prototype.initBoxComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget");
	node.addClass("ui-widget-content");
	node.addClass("ui-corner-all");
};

/**
 * tableタグで記述された内容をTableコンポーネントとして表示する。table内の内容は直接編集しない。javascriptのイベントなどを定義している場合は保持される。
 * @returns {Table}
 */
function Table() {
};
Table.prototype = new Component();

/**
 * セルに適したjQuery ui themeで適用されるCSS属性を設定します。
 * @param nodeSelector
 */
Table.prototype.initCellComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget-content");
	node.addClass("ui-table-cell");
	node.addClass("ui-state-default");
};
/**
 * ヘッダー行に適したjQuery ui themeで適用されるCSS属性を設定します。
 * @param nodeSelector
 */
Table.prototype.initHeaderRowComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget-header");
	node.addClass("ui-table-header-row");
	node.addClass("ui-state-default");
};
/**
 * 行に適したjQuery ui themeで適用されるCSS属性を設定します。
 * @param nodeSelector
 */
Table.prototype.initRowComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget-content");
	node.addClass("ui-table-row");
	node.addClass("ui-state-default");
};
Table.prototype.initComponents = function(rootNode) {
	this.initBoxComponentStyle(rootNode);

	var node = $(rootNode);
	node.addClass("table");

	var trNodes = $("thead tr",node);
	for(var i=0; i< trNodes.size();i++) {
		var tr = trNodes.get(i);
		log.debug(tr);
		this.initHeaderRowComponentStyle(tr);
	}
	var trNodes = $("tbody tr",node);
	for(var i=0; i< trNodes.size();i++) {
		var tr = trNodes.get(i);
		log.debug(tr);
		this.initRowComponentStyle(tr);
	}
};
Table.prototype.extend = function(plugin) {
	plugin();
};
Table.prototype.getSelectedRows = function() {
	$("tr.ui-state-active", this.getTableBody());
};
Table.prototype.getRootNode = function() {
	return this._rootNode;
};

Table.prototype.getTableBody = function() {
	if(!this._tableBody) {
		this._tableBody =$("tbody", this.getRootNode());
	}
	return this._tableBody;
};

//Component.prototype

/**
 * tableタグに記述された内容を入力フォームの値として使い、表形式の入力が行えるSpreadSheetコンポーネントを生成する。
 * tableタグ内にバインドされていたjavascriptのイベントはすべて無効化される。
 */
function SpreadSheet(rootNode, params) {
	this._rootNode = rootNode;
	this._params = params;

	this.initComponents(rootNode, params);
	this.createCellComponents(rootNode, params);
	this.initEventHandlers(rootNode, params);

	this.increaseAndDecreaseRow(params);

}
SpreadSheet.prototype = new Table();
SpreadSheet.prototype.getRootNode = function() {
	return this._rootNode;
};
SpreadSheet.prototype.createCellComponents = function(rootNode) {
	//tdノード内のテキストを取得して、入力フォームの値とする。
	var tdNodes = $("tbody td", rootNode);
	for(var i=0;i<tdNodes.size();i++) {
		var td = tdNodes.get(i);
		var value = this.parseValue(td);
		log.debug("SpreadSheet.createCellCompoents:value="+value);
		var input = this.createInputNode(value);
		//tdノードの中身を消去。removeメソッドは削除対象のjQueryオブジェクトは削除しないので注意
		//$(td).children().remove();
		$(td).html(input);
	}
};
SpreadSheet.prototype.parseValue = function(tdNode) {
	return $(tdNode).text();
};
SpreadSheet.prototype.createInputNode = function(value) {
	var input = document.createElement("input");
	$(input).val(value);
	$(input).addClass("ui-table-input");

	return input;
};



SpreadSheet.prototype.initEventHandlers = function(rootNode, params) {
	//hover
	$(this.getTableBody()).on("mouseenter","tr",function() {
		$(this).addClass("ui-state-hover");
	});
		//mouse leave
	$(this.getTableBody()).on("mouseleave","tr",function() {
		$(this).removeClass("ui-state-hover");
	});

	//active state control.
	$(this.getTableBody()).on("click","tr",function() {
		$(this).toggleClass("ui-state-active");
	});
};



//})(jQuery);