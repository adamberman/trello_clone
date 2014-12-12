TrelloClone.Views.BoardIndexItem = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},

	className: "board-index-item-wrapper",

	template: JST['boards/board_index_item'],
	
	render: function(){
		var content = this.template({
			board: this.model
		});
		this.$el.html(content);
		return this;
	}
})