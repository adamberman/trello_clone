TrelloClone.Views.BoardDeleteButton = Backbone.View.extend({
	template: JST['boards/board_delete_button'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})