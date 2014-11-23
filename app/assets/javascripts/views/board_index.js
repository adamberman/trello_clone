TrelloClone.Views.BoardIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addBoard);
		this.listenTo(this.collection, "remove", this.removeBoard);
		this.collection.each(this.addBoard.bind(this));
		this.addNewBoardButton();
	},
	template: JST['boards/board_index'],
	events: {
		"click button.board": "selectBoard",
		"click button.new-board": "newBoard",
		"click button.back": "removeNewBoardView",
		"submit form": "submit"
	},
	addBoard: function(board){
		var boardShow = new TrelloClone.Views.BoardIndexItem({
			model: board
		});
		this.addSubview(".boards", boardShow);
	},
	removeBoard: function(board){
		var boardShow = _.find(this.subviews(".boards"), function(subview){
			return subview.model === board;
		});
		this.removeSubview(".boards", boardShow);
	},
	selectBoard: function(event){
		var $target = $(event.currentTarget);
		var id = $target.data('id');
		Backbone.history.navigate('boards/' + id, { trigger: true })
	},
	addNewBoardButton: function(){
		this._newBoardButton = new TrelloClone.Views.BoardIndexNewItem();
		this.addSubview(".new-board", this._newBoardButton);
	},
	removeNewBoardButton: function(){
		this._newBoardButton.remove();
	},
	newBoard: function(event){
		event.preventDefault();
		this._boardNewFormView = new TrelloClone.Views.BoardNewForm({collection: this.collection});
		this.removeNewBoardButton();
		this.addSubview(".new-board-form", this._boardNewFormView);
	},
	removeNewBoardView: function(){
		event.preventDefault();
		this._boardNewFormView.remove();
		this.addNewBoardButton();
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
	},
	render: function(){
		var content = this.template();

		this.$el.html(content);
		this.attachSubviews();
		return this;
	}
})