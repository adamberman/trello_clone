TrelloClone.Views.BoardBackButton = Backbone.View.extend({
	template: JST['boards/board_back_button'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})