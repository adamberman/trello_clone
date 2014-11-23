TrelloClone.Views.ListNewForm = Backbone.View.extend({
	template: JST['lists/list_new_form'],
	tagName: 'form',
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})