TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addListIndex);
		this.listenTo(this.collection, "remove", this.removeListIndex);
		this.addListIndex(this.model);
	},
	template: JST['boards/board_show'],
	addListIndex: function(listIndex){
		var listIndexShow = new TrelloClone.Views.ListIndex({
			collection: listIndex.lists(),
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