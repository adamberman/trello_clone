TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addCardIndex(this.model);
	},
	template: JST['lists/list_show'],
	addCardIndex: function(cardIndex){
		var cardIndexShow = new TrelloClone.Views.CardIndex({
			model: cardIndex,
			collection: cardIndex.cards()
		});
		this.addSubview(".card-index", cardIndexShow);
	},
	removeCardIndex: function(cardIndex){
		var cardIndexShow = _.find(this.subviews(".card-index"), function(subview){
			return subview.model === cardIndex;
		});
		this.removeSubview(".card-index", cardIndexShow);
	},
	render: function(){
		var content = this.template({
			list: this.model
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})