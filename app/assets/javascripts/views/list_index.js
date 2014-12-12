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
		"click button.new-list-item": "newList",
		"click button.back": "removeNewListView",
		"submit form.new-list": "submit",
		"sortstop .lists": "dropList"
	},
	
	dropList: function(event, ui){
		var listOrder = [];
		var lists = $(event.currentTarget).children();
		var listCount = lists.length;
		for(var i = 0; i < listCount; i++) {
			listOrder.push($(lists[i].children).data('id'));
		}
		console.log(listOrder);
	},
	
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
		this.removeSubview(".new-list", this._newListButton);
		this._newListButton.remove();
	},
	
	newList: function(event){
		event.preventDefault();
		this._listNewFormView = new TrelloClone.Views.ListNewForm({model: this.model});
		this.removeNewListButton();
		this.addSubview(".new-list-form", this._listNewFormView);
	},
	
	removeNewListView: function(){
		event.preventDefault();
		this.removeSubview(".new-list-form", this._listNewFormView)
		this._listNewFormView.remove();
		this.addNewListButton();
	},
	
	submit: function(event){
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.List(params["list"]);

		newList.save({}, {
			success: function(){
				this.collection.add(newList);
				this.removeNewListView();
			}.bind(this)
		})
	},
	
	onRender: function(){
		Backbone.CompositeView.prototype.onRender.call(this);
		this.$('.lists').sortable({connectWith: '.lists'});
	},
	
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		this.onRender();
		return this;
	}
})