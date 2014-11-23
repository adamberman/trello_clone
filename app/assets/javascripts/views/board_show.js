TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addListIndex(this.model);
	},
	template: JST['boards/board_show'],
	events: {
		"click button.delete": "deleteBoard",
		"click button.back": "back"
	},
	addListIndex: function(listIndex){
		var listIndexShow = new TrelloClone.Views.ListIndex({
			model: listIndex,
			collection: listIndex.lists(),
		});
		this.addSubview(".list-index", listIndexShow);
	},
	deleteBoard: function(event){
		event.preventDefault();
		this.model.destroy();
		Backbone.history.navigate('', { trigger: true });
	},
	back: function(){
		event.preventDefault();
		Backbone.history.navigate('', { trigger: true });
	}
	render: function(){
		var content = this.template({
			board: this.model
		});

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})