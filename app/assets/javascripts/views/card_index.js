TrelloClone.Views.CardIndex = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.cards = [];
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addCard);
		this.listenTo(this.collection, "remove", this.removeCard);
		this.collection.each(this.addCard.bind(this));
		this.addNewCardButton();
	},
	
	template: JST['cards/card_index'],
	
	events: {
		"click button.new-card-item": "newCard",
		"click button.back": "removeNewCardView",
		"submit form.new-card": "submit",
		"sortstart .cards": "pickUpCard",
		"sortstop .cards": "dropCard"
	},

	pickUpCard: function(event, ui) {
		var id = parseInt(ui.item.attr('id'));
		var card = this.collection.get(id);
		this.collection.remove(card);
	},

	dropCard: function(event, ui) {
		var id = parseInt(ui.item.attr('id'));
		var card = new TrelloClone.Models.Card({ id: id });
		this.collection.add(card);
		this.updateCardsOrder();
	},

	updateCardsOrder: function(){
		var cards = this.$('.card-item').not('.ui-sortable-placeholder');
		for (var i = 0; i < this.cards.length; i++) {
			var id = parseInt($(cards[i]).attr('id'));
			var card = this.collection.get(id);
			this.removeCard(card);
			card.set('ord', i);
			this.addCard(card);
			var that = this;
			card.save({}, {
				success: function() {
					that.render();
				}
			})
		}
	},

	addCard: function(card){
		var cardShow = new TrelloClone.Views.CardItem({
			model: card
		});
		this.addSubview(".cards", cardShow);
		this.cards.push(card);
	},
	
	onRender: function(){
		Backbone.CompositeView.prototype.onRender.call(this);
		this.$('.cards').sortable({connectWith: '.cards'});
	},
	
	removeCard: function(card){
		var cardShow = _.find(this.subviews(".cards"), function(subview){
			return subview.model === card;
		});
		this.removeSubview(".cards", cardShow);
		var index = this.cards.indexOf(card);
		this.cards.splice(index, 1);
	},
	
	addNewCardButton: function(){
		this._newCardButton = new TrelloClone.Views.CardIndexNewItem();
		this.addSubview(".new-card", this._newCardButton);
	},
	
	removeNewCardButton: function(){
		this.removeSubview(".new-card", this._newCardButton);
		this._newCardButton.remove();
	},
	
	newCard: function(event){
		event.preventDefault();
		this._cardNewFormView = new TrelloClone.Views.CardNewForm({model: this.model});
		this.removeNewCardButton();
		this.addSubview(".new-card-form", this._cardNewFormView);
	},
	
	removeNewCardView: function(){
		event.preventDefault();
		this.removeSubview(".new-card-form", this._cardNewFormView)
		this._cardNewFormView.remove();
		this.addNewCardButton();
	},
	
	submit: function(event){
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON();
		var newCard = new TrelloClone.Models.Card(params["card"]);

		newCard.save({}, {
			success: function(){
				this.collection.add(newCard);
				this.removeNewCardView();
			}.bind(this)
		})
	},
	
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		return this;
	}
})