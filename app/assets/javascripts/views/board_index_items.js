TrelloClone.Views.BoardIndexItem = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
	},
	template: JST['boards/board_index_item'],
	events: {
		"mouseenter": "createDeleteButton",
		"mouseleave": "deleteDeleteButton"
	},
	render: function(){
		var content = this.template({
			board: this.model
		});
		this.$el.html(content);
		return this;
	},
	createDeleteButton: function(event){
		var $target = $(event.currentTarget);
		var id = $target.data('id');
		this._deleteButton = new TrelloClone.Views.DeleteButton({model: this.model});
		this.addSubview(".delete-button", this._deleteButton);
	},
	deleteDeleteButton: function(){
		this.removeSubview(".delete-button", this._deleteButton);
		this._deleteButton.remove();
	}
})