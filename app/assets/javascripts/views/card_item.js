TrelloClone.Views.CardItem = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},
	template: JST['cards/card_item'],
	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		return this;
	}
})