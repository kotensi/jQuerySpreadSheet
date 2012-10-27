/**
 * SpreadSheetに行挿入、削除機能を追加するPluginです。
 *
 * 以下のカスタムイベントを定義します。
 * <ul>
 *   <li>insert-row : 行を挿入するイベント</li>
 *   <li>delete-row : 行を削除するイベント</li>
 * </ul>
 * @param params
 */
SpreadSheet.prototype.increaseAndDecreaseRow = function(params) {
	//デフォルトパラメータ
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
		//選択行のうち一番下の行を取得
		var row = $("tr.ui-state-active:last", this._rootNode);
		//イベントの送信 (実際に行を挿入する処理はこのイベントを受信したロジックに任せる
		log.debug("RoeOperator:click insertButton. last active row="+row);
		$(row).trigger("insert-row");
	});
	var deleteButton = document.createElement("button");
	$(deleteButton).text("delete row");
	$(deleteButton).click(function() {
		var row = $("tr.ui-state-active:last", this._rootNode);
		//イベントの送信
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
		//このイベントのtargetは、現在選択されている行のうち一番下の行(tr)
		var targetRow = e.target;
		var newRow = $(targetRow).clone();
		//targetの次に、新しい行を追加する。
		$(targetRow).before(newRow);
		//SpreadSheetのイベントは$.on()で定義されているので、新しく挿入された行にも事前に定義されたイベントが適用される。
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