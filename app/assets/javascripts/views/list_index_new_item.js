TrelloClone.Views.ListIndexNewItem = Backbone.View.extend({
	template: JST['lists/list_index_new_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})