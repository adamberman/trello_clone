TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addList);
		this.listenTo(this.collection, "remove", this.removeList);
		this.collection.each(this.addList.bind(this));
		this.addNewListButton();
	},
	template: JST['lists/list_index'],
	events: {
		"click button.new-list": "newList",
		"click button.back": "removeNewListView",
		"submit form": "submit"
	}
	addList: function(list){
		var listShow = new TrelloClone.Views.ListShow({
			model: list
		});
		this.addSubview(".lists", listShow);
	},
	removeList: function(list){
		var listShow = _.find(this.subviews(".lists"), function(subview){
			return subview.model === list;
		});
		this.removeSubview(".lists", listShow);
	},
	addNewListButton: function(){
		this._newListButton = new TrelloClone.Views.ListIndexNewItem();
		this.addSubview(".new-list", this._newListButton);
	},
	removeNewListButton: function(){
		this._newListButton.remove();
	},
	newList: function(event){
		event.preventDefault();
		this._listNewFormView = new TrelloClone.Views.BoardNewForm({collection: this.collection});
		this.removeNewBoardButton();
		this.addSubview(".new-board-form", this._boardNewFormView);
	},
	removeNewListView: function(){

	},
	submit: function(){

	},
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})