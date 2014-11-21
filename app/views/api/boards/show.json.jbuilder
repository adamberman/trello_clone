# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.partial! 'board', board: @board
json.lists do
	json.array!(@board.lists) do |list|
		json.partial! 'list', list: list
		json.cards do
			json.array!(list.cards) do |card|
				json.partial! 'card', card: card
			end
		end
	end
end


