TrelloClone.Views.ListNewForm = Backbone.View.extend({
	
	template: JST['lists/list_new_form'],
	
	tagName: 'form',
	
	className: 'new-list',
	
	render: function(){
		var content = this.template({
			board: this.model
		});

		this.$el.html(content);
		return this;
	}
})