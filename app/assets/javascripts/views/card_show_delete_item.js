TrelloClone.Views.CardShowDeleteItem = Backbone.View.extend({
	template: JST['cards/card_show_delete_item'],
	render: function(){
		var content = this.template();

		this.$el.html(content);
		return this;
	}
})