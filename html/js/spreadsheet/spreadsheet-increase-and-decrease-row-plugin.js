/**
 * SpreadSheet�ɍs�}���A�폜�@�\��ǉ�����Plugin�ł��B
 *
 * �ȉ��̃J�X�^���C�x���g���`���܂��B
 * <ul>
 *   <li>insert-row : �s��}������C�x���g</li>
 *   <li>delete-row : �s���폜����C�x���g</li>
 * </ul>
 * @param params
 */
SpreadSheet.prototype.increaseAndDecreaseRow = function(params) {
	//�f�t�H���g�p�����[�^
	params = $.extend({

	}, params);
	console.debug("loading... increase-and-decrease-row-plugin.");

	var rowOeprator = new RowOperator(this, params);
};

/**
 *
 * @param (SpreadSheet) spreadsheet
 * @param (Object) params
 * @returns
 */
function RowOperator(spreadsheet, params) {
	this._params = params;
	this._spreadsheet = spreadsheet;
	this._rootNode = spreadsheet.getRootNode();
	this.initComponents(this._rootNode);
	this.initEventHandlers(this._rootNode);


}
RowOperator.prototype.initComponents = function(rootNode) {
	$(rootNode).append(this.createMenuComponent());
};
RowOperator.prototype.createMenuComponent = function(rootNode) {
	var menu = document.createElement("div");
	var insertButton = document.createElement("button");
	$(insertButton).text("insert row");
	$(insertButton).click(function() {
		//�I���s�̂�����ԉ��̍s���擾
		var row = $("tr.ui-state-active:last", this._rootNode);
		//�C�x���g�̑��M (���ۂɍs��}�����鏈���͂��̃C�x���g����M�������W�b�N�ɔC����
		log.debug("RoeOperator:click insertButton. last active row="+row);
		$(row).trigger("insert-row");
	});
	var deleteButton = document.createElement("button");
	$(deleteButton).text("delete row");
	$(deleteButton).click(function() {
		var row = $("tr.ui-state-active:last", this._rootNode);
		//�C�x���g�̑��M
		log.debug("RoeOperator:click deleteButton. last active row="+row);
		$(row).trigger("delete-row");
	});
	$(menu).append(insertButton);
	$(menu).append(deleteButton);

	return menu;
};

RowOperator.prototype.initEventHandlers = function(rootNode) {
	var rowop = this;
	$(rootNode).on("insert-row", function(e) {
		console.debug("receive insert-row event. e.target="+$(e.target).html());
		//���̃C�x���g��target�́A���ݑI������Ă���s�̂�����ԉ��̍s(tr)
		var targetRow = e.target;
		var newRow = $(targetRow).clone();
		//target�̎��ɁA�V�����s��ǉ�����B
		$(targetRow).before(newRow);
		//SpreadSheet�̃C�x���g��$.on()�Œ�`����Ă���̂ŁA�V�����}�����ꂽ�s�ɂ����O�ɒ�`���ꂽ�C�x���g���K�p�����B
	});
	$(rootNode).on("delete-row", function(e) {
		console.debug("receive delete-row event. e.target="+this);
		var targetRow = e.target;
		$(targetRow).remove();
	});

};
RowOperator.prototype.getSelectedLastRow = function() {
	return $("tr.ui-state-active",this._spreadsheet.getSelectedRows());
};