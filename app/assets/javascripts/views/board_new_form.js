TrelloClone.Views.BoardNewForm = Backbone.View.extend({
	
	template: JST['boards/board_new_form'],
	
	tagName: 'form',
	
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})