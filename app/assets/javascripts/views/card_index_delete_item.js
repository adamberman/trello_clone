TrelloClone.Views.CardIndexDeleteItem = Backbone.View.extend({
	template: JST['cards/card_index_delete_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})