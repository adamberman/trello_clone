TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addBoard);
		this.listenTo(this.collection, "remove", this.removeBoard);
		this.collection.each(this.addBoard.bind(this));
	},
	template: JST['boards/board_index'],
	events: {
		"click button.board": "selectBoard"
	},
	addBoard: function(board){
		var boardShow = new TrelloClone.Views.BoardIndexItem({
			model: board
		});
		this.addSubview(".boards", boardShow);
	},
	removeBoard: function(board){
		var boardShow = _.find(this.subviews(".boards"), function(subview){
			return subview.model === board;
		});
		this.removeSubview(".boards", boardShow);
	},
	selectBoard: function(event){
		var $target = $(event.currentTarget);
		var id = $target.data('id');
		Backbone.history.navigate('boards/' + id, { trigger: true })
	},
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})