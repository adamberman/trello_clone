TrelloClone.Routers.BoardRouter = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},
	routes: {
		"": "index",
		"boards/:id": "show"
	},
	index: function(){
		var collection = new TrelloClone.Collections.Boards()
		collection.fetch();
		var view = new TrelloClone.Views.BoardIndex({collection: collection});
		this._swapView(view);
	},
	show: function(id){
		var board = new TrelloClone.Models.Board({id: id});
		board.fetch();
		var view = new TrelloClone.Views.BoardShow({model: board});
		this._swapView(view);
	},
	_swapView: function(newView){
		if(this._currentView){
			this._currentView.remove();
		}
		this.$rootEl.html(newView.render().$el);
		this._currentView = newView;
	}
})