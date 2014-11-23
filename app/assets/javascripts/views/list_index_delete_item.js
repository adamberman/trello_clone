TrelloClone.Views.ListIndexDeleteItem = Backbone.View.extend({
	template: JST['lists/list_index_delete_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})