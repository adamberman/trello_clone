TrelloClone.Views.CardNewForm = Backbone.View.extend({
	
	template: JST['cards/card_new_form'],
	
	tagName: 'form',
	
	className: 'new-card',
	
	render: function(){
		var content = this.template({
			list: this.model
		});

		this.$el.html(content);
		return this;
	}
})