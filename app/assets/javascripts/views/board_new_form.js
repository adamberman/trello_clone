TrelloClone.Views.BoardNewForm = Backbone.View.extend({
	template: JST['boards/board_new_form'],
	tagName: 'form',
	events: {
		'click button.submit': 'submit'
	},
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})