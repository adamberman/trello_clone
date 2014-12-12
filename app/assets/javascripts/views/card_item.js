TrelloClone.Views.CardItem = Backbone.View.extend({
	
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},
	
	template: JST['cards/card_item'],
	
	events: {
		"click button.card-delete-item": "deleteCard"
	},
	
	tagName: "li",
	
	className: "card-item list-group-item",
	
	deleteCard: function(event){
		event.preventDefault();
		debugger;
		this.model.destroy();
	},
	
	render: function(){
		var content = this.template({
			card: this.model
		});
		this.$el.html(content);
		return this;
	}
})