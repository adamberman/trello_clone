TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addListIndex(this.model);
	},
	template: JST['boards/board_show'],
	addListIndex: function(listIndex){
		var listIndexShow = new TrelloClone.Views.ListIndex({
			model: listIndex,
			collection: listIndex.lists(),
		});
		this.addSubview(".list-index", listIndexShow);
	},
	removeListIndex: function(listIndex){
		var listIndexShow = _.find(this.subviews(".list-index"), function(subview){
			return subview.model === listIndex;
		});
		this.removeSubview(".list-index", listIndexShow);
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