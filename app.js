
// This is a two player game with a 52 card deck.
// Array of 1-13 four times each
// [1,1,1,1,2,2,2,2,3,3,3,3,4,3,3,3...]
let game = {
    player: {
        playerBooks: 0, // if ===7 alert player wins 
        playerHand: [] // --- displaying cards in hand, write a function that puts the cards in order by 
        //value numbers only will handle the image of each card in another way
    },
    computer: {
        computerBooks: 0, // if === 7 alert computer wins 
        computerHand: []
    },
    
    deck: [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13],
     // in deck array slice() allows you to grab an element from anywhere in the array if you know where the position is  
    // cards are number elements
    shuffle: function() {
        for (let i = 0; i < 52; i++) {
            let randomVal = Math.round(Math.random() * 51 );
            let temp = this.deck[randomVal];
            this.deck[randomVal] = this.deck[i];
            this.deck[i] = temp;
        }
    },

    deal: function () {
        for (let i=0; i<= 6; i++) {
            // shift() from the deck array and push() to computer and player hand arrays 
            // Deal button starts the game ->Each player is automatically dealt 7 random cards to the player and to the computerHAND from the deck, 
            //the remaining 38 cards remain face down in the "pond".
            // how do I make this only accur at the start of the game / disable button after start?
            
            let cards = this.deck.shift();
            this.player.playerHand.push(cards);
            cards = this.deck.shift();
            this.computer.computerHand.push(cards);
        
        }    
    },

    computerTurn: function () {
        // asks for a card === to the value of a card in their hand
        // player is prompted give card or tell computer Go Fish (two buttons give card moves card from playerHand to ComputerHand, second button GO Fish)
    },

    drawACard: function () {
        for (let i=0; i<= 1; i++) { // probably dont need for loop 
            ///need to edit so that only the player or computer draws a card
           if (this.deck.length > 1) {
            let card = this.deck.shift();
            this.player.playerHand.push(card);
            card = this.deck.shift();
            this.computer.computerHand.push(card);
            } else {
                alert("OUT OF CARDS")
            }
        } 
    },

    checkBooks: function (hand) {
        // // write a function that puts the cards in order by value 
        //a book is 4 cards of the same value.
        // once a book is created = 1 point (updated in player/ computer books)
        // those cards are then removed from player/ computer hand 
        // update playerBooks/ computerBooks -> if === 7 game is over alert "Player wins the game!"
        // find all cards of same value (counter variable starts at 0 once it hits 4 removes those cards from array and adds a point)
    }
}




let buttonElement = document.querySelector('button')
buttonElement.addEventListener('click', function () {
    
    game.deal()
    document.querySelector('button').disabled = true;
    console.log("Player Hand: ", game.player.playerHand)
    console.log("Computer Hand: ", game.computer.computerHand)
    console.log(game.deck)
    let container = document.querySelector('.playerHand')
    console.log(container)
    
    game.player.playerHand.forEach(function (valueOfCard) {
        // for each function === for each of the elements in the array (playerHand) do "this" display the value of the card
        // show me the cards on the page 
        let button = document.createElement('button') 
        
        button.textContent = valueOfCard
        button.setAttribute('value', valueOfCard)
        container.appendChild(button)
        button.addEventListener('click', function(event) {
            let card = Number(event.target.value)  // this data types returns as a string in HTML -> use Number()
          let computerHandIndex = game.computer.computerHand.findIndex(function (computerCardValue){
               
              return card === computerCardValue
            })
            if (computerHandIndex === -1) {
                alert('GO FISH')
                // then draw a card 
            } else {
                game.computer.computerHand.splice(computerHandIndex, 1);
                game.player.playerHand.push(card)
                console.log(game.player.playerHand)
                console.log(game.computer.computerHand)

            }
        })

    })
})


game.shuffle()
console.log(game.deck)

// function playerTurn() {
//     // compare card (clicked) to computerHand
//     for (let i=0; i<= this.computer.computerHand.length; i++)
//     let selectedCard = 

    // this.computer.computerHand.includes(card)

    // FUNCTION  is the element I'm asking for in the computer hand? findIndex() if yes push() and splice() to remove from computerHand array. if undefined alert GO FISH 
    
    // const array1 = [5, 12, 8, 130, 44];
    // const found = array1.find(element => element > 10);
    // console.log(found);
        
    // FUNCTION? playerHand gets that card and computerHand loses that card push()
    // if not found will return undefined -> if undefined alert GO FISH 

    
    // if not found will return undefined -> if undefined alert GO FISH 
    // or alert GO fish! shift() from pond/ deck moves card into push() hand -> check for books 
    // if hand <= 0 turn consists of drawing from deck/ pond shift()
    // another method 
    
    // keep asking until GO fish alert (stretch goal)
//}