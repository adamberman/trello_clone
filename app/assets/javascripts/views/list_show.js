TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addCardIndex);
		this.listenTo(this.collection, "remove", this.removeCardIndex);
		this.addCardIndex(this.model);
	},
	template: JST['lists/list_show'],
	addCardIndex: function(cardIndex){
		var cardIndexShow = new TrelloClone.Views.CardIndex({
			collection: cardIndex.cards()
		});
		this.addSubview(".cardIndex", cardIndexShow);
	},
	removeCardIndex: function(cardIndex){
		var cardIndexShow = _.find(this.subviews(".cardIndex"), function(subview){
			return subview.model === cardIndex;
		});
		this.removeSubview(".cardIndex", cardIndexShow);
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