window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	new TrelloClone.Routers.BoardRouter({$rootEl: $('#main')});
  	Backbone.history.start();
  }
};