TrelloClone.Views.BoardNewForm = Backbone.View.extend({
	template: JST['boards/board_new_form'],
	tagName: 'form',
	events: {
		'submit form': 'submit'
	},
	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	},
	submit: function(event){
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON();
		var newBoard = new TrelloClone.Models.Board(params["board"]);

		newBoard.save({}, {
			success: function(){
				this.collection.add(newBoard);
				Backbone.history.navigate('boards/' + newBoard.id, { trigger: true });
			}.bind(this)
		})
	}
})