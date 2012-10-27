//(function($) {

/**
 * $(selector).table(args);
 */
$.fn.extend({
	spreadsheet: function(params) {
		//�f�t�H���g�p�����[�^
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
 * table�^�O�ŋL�q���ꂽ���e��Table�R���|�[�l���g�Ƃ��ĕ\������Btable���̓��e�͒��ڕҏW���Ȃ��Bjavascript�̃C�x���g�Ȃǂ��`���Ă���ꍇ�͕ێ������B
 * @returns {Table}
 */
function Table() {
};
Table.prototype = new Component();

/**
 * �Z���ɓK����jQuery ui theme�œK�p�����CSS������ݒ肵�܂��B
 * @param nodeSelector
 */
Table.prototype.initCellComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget-content");
	node.addClass("ui-table-cell");
	node.addClass("ui-state-default");
};
/**
 * �w�b�_�[�s�ɓK����jQuery ui theme�œK�p�����CSS������ݒ肵�܂��B
 * @param nodeSelector
 */
Table.prototype.initHeaderRowComponentStyle = function(nodeSelector) {
	var node = $(nodeSelector);
	node.addClass("ui-widget-header");
	node.addClass("ui-table-header-row");
	node.addClass("ui-state-default");
};
/**
 * �s�ɓK����jQuery ui theme�œK�p�����CSS������ݒ肵�܂��B
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
 * table�^�O�ɋL�q���ꂽ���e����̓t�H�[���̒l�Ƃ��Ďg���A�\�`���̓��͂��s����SpreadSheet�R���|�[�l���g�𐶐�����B
 * table�^�O���Ƀo�C���h����Ă���javascript�̃C�x���g�͂��ׂĖ����������B
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
	//td�m�[�h���̃e�L�X�g���擾���āA���̓t�H�[���̒l�Ƃ���B
	var tdNodes = $("tbody td", rootNode);
	for(var i=0;i<tdNodes.size();i++) {
		var td = tdNodes.get(i);
		var value = this.parseValue(td);
		log.debug("SpreadSheet.createCellCompoents:value="+value);
		var input = this.createInputNode(value);
		//td�m�[�h�̒��g�������Bremove���\�b�h�͍폜�Ώۂ�jQuery�I�u�W�F�N�g�͍폜���Ȃ��̂Œ���
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