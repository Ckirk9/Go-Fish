console.log("Go Fish ")

// This is a two player game with a 52 card deck.
// Array of 1-13 four times each
// [1,1,1,1,2,2,2,2,3,3,3,3,4,3,3,3...]

// Each player is automatically dealt 7 random cards, the remaining 38 cards remain face down in the "pond".
//way to deal the cards 

// Players can only see the cards in their hand. way to view the cards in hand for player / CPU 
//Way to respond “yes” with a card or “go fish” -> go fish automatically lights up or flashes if the player does not have the card being asked for 


// Each player is trying to get the most "books" a book is 4 cards of the same value.
// method to check for books // removed books from the hand and place in the "player book pond"
// Any books that are built are placed face up on the board for everyone to see.

// Each player takes turns back and forth asking for the cards likely to build books.


// Each turn the player will review thier hand of cards and ask the other player if they have a 
// card that matches a card in their hand in an effort to create a book.


// If the second player has the card that is being requested it is given to the asking player 
// and the asking player is allowed to ask for another card. The turn continues until the second player does 
// not have the card the asking player is asking for. At that point the second player responds "Go Fish" 
// and the asking player will draw one card from the pond.
//a method to draw from the pond 




// If a player has 7 books that player wins and the game is over.


// If a player runs out of cards in their hand, their turn consists of drawing one card from the pond. //
// if the player is out of cards other player automatically "go fish"

// If the player has no cards and the pond is empty, the game is over for that player, but 
// mathematically speaking 7 books will be created before this happens.