TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addCard);
		this.listenTo(this.collection, "remove", this.removeCard);
		this.collection.each(this.addCard.bind(this));
	},
	template: JST['lists/list_show'],
	addCard: function(card){
		var cardShow = new TrelloClone.Views.CardItem({
			model: card
		});
		this.addSubview(".cards", cardShow);
	},
	removeCard: function(card){
		var cardShow = _.find(this.subviews(".cards"), function(subview){
			return subview.model === card;
		});
		this.removeSubview(".cards", cardShow);
	},
	render: function(){
		var content = this.template({
			cards: this.collection
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})