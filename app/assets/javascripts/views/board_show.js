TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addList);
		this.listenTo(this.collection, "remove", this.removeList);
		this.collection.each(this.addList.bind(this));
	},
	template: JST['boards/board_show'],
	addListIndex: function(listIndex){
		var listIndexShow = new TrelloClone.Views.ListIndex({
			collection: listIndex.lists,
			model: listIndex
		});
		this.addSubview(".listIndex", listIndexShow);
	},
	removeListIndex: function(listIndex){
		var listIndexShow = _.find(this.subviews(".listIndex"), function(subview){
			return subview.model === listIndex;
		});
		this.removeSubview(".listIndex", listIndexShow);
	},
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})