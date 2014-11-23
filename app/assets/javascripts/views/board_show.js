TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addListIndex(this.model);
		this.addBoardDeleteButton();
		this.addBackButton();
	},
	template: JST['boards/board_show'],
	events: {
		"click button.board-delete": "deleteBoard",
		"click button.back-to-index": "back"
	},
	addListIndex: function(listIndex){
		var listIndexShow = new TrelloClone.Views.ListIndex({
			model: listIndex,
			collection: listIndex.lists(),
		});
		this.addSubview(".list-index", listIndexShow);
	},
	addBoardDeleteButton: function(){
		var boardDeleteButton = new TrelloClone.Views.BoardDeleteButton();
		this.addSubview(".buttons", boardDeleteButton);
	},
	addBackButton: function(){
		var backButton = new TrelloClone.Views.BoardBackButton();
		this.addSubview('.buttons', backButton);
	},
	deleteBoard: function(event){
		event.preventDefault();
		this.model.destroy();
		Backbone.history.navigate('', { trigger: true });
	},
	back: function(){
		event.preventDefault();
		Backbone.history.navigate('', { trigger: true });
	},
	render: function(){
		var content = this.template({
			board: this.model
		});

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})