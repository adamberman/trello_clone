TrelloClone.Views.ListShowDeleteItem = Backbone.View.extend({
	template: JST['lists/list_show_delete_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})