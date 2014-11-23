TrelloClone.Views.CardIndexNewItem = Backbone.View.extend({
	template: JST['cards/card_index_new_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})