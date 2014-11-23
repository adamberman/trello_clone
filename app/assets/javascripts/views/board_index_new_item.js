TrelloClone.Views.BoardIndexNewItem = Backbone.View.extend({
	template: JST['boards/board_index_new_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})