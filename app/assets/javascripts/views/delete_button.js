TrelloClone.Views.DeleteButton = Backbone.View.extend({
	template: JST['utilities/delete_button'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})