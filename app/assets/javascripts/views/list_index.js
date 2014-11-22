TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addList);
		this.listenTo(this.collection, "remove", this.removeList);
		this.collection.each(this.addList.bind(this));
	},
	template: JST['lists/list_index'],
	addList: function(list){
		var listShow = new TrelloClone.Views.ListShow({
			collection: list.cards,
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
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})