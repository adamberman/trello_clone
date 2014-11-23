TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addCardIndex(this.model);
		this.addListDeleteButton();
	},
	template: JST['lists/list_show'],
	events: {
		// "hover div.list-show": "addListDeleteButton",
		// "mouseout div.list-show": "removeListDeleteButton",
		"click button.list-delete-item": "deleteList"
	},
	addCardIndex: function(cardIndex){
		var cardIndexShow = new TrelloClone.Views.CardIndex({
			model: cardIndex,
			collection: cardIndex.cards()
		});
		this.addSubview(".card-index", cardIndexShow);
	},
	addListDeleteButton: function(){
		this._listDeleteButton = new TrelloClone.Views.ListShowDeleteItem();
		this.addSubview('.list-delete-button', this._listDeleteButton);
	},
	removeListDeleteButton: function(){
		this.removeSubview('.list-delete-button', this._listDeleteButton);
		this._listDeleteButton.remove();
	},
	deleteList: function(event){
		event.preventDefault();
		this.model.destroy();
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