TrelloClone.Collections.Cards = Backbone.Collection.extend({
	model: TrelloClone.Model.Card,
	url: "/api/cards"
})