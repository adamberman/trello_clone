TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
	
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.addCardIndex(this.model);
	},
	
	tagName: "li",
	
	className: "list-show col-sm-3",
	
	template: JST['lists/list_show'],

	events: {
		"click button.list-delete-item": "deleteList",
	},
	
	addCardIndex: function(list){
		var cardIndexShow = new TrelloClone.Views.CardIndex({
			model: list,
			collection: list.cards()
		});
		this.addSubview(".card-index", cardIndexShow);
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
});