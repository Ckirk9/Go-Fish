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
            let cards = this.deck.shift();
            this.player.playerHand.push(cards);
            cards = this.deck.shift();
            this.computer.computerHand.push(cards);
        //check for books 
        }    
    },

    computerTurn: function () {
        // asks for a card === to the value of a card in their hand
        let computerAsk = Math.round(Math.random() * this.computer.computerHand.length)
        let computerCardValue = this.computer.computerHand[computerAsk]
        let playerHandIndex = this.player.playerHand.findIndex(function (playerCardValue){ 
            return computerCardValue === playerCardValue
          })
        // player is prompted give card or tell computer Go Fish (two buttons give card moves card from playerHand to ComputerHand, second button GO Fish)
        if (playerHandIndex === -1) {
            // then draw a card 
            if (this.deck.length > 1) {
                let card = this.deck.shift();
                this.computer.computerHand.push(card);
                console.log(this.deck.length)
                console.log("computer turn", this.computer.computerHand)
                // string interpolation!!!
                alert(`Computer asked for ${computerCardValue} and went fishing!`)
            } else {
                    alert("OUT OF CARDS")
                }
            } else {
                // computerHand gets that card and playerHand loses that card push() 
                // updated playerHand Container to reflect card that was taken 
                this.player.playerHand.splice(playerHandIndex, 1);
                this.computer.computerHand.push(computerCardValue)
                console.log("after computer turn players hand", this.player.playerHand)
                console.log("computer turn", this.computer.computerHand)
                // string interpolation!!!
                alert(`Computer asked for ${computerCardValue} and took it from your hand!`)
                // got this from web MDN .removeChild
                // html element that represents the card the computer took aka node aka "removedCard"
                let removedCard = document.querySelector(`.card-${computerCardValue}`);
                console.log(removedCard)
                console.log(`.card-${computerCardValue}`)
                if (removedCard.parentNode) {
                    removedCard.parentNode.removeChild(removedCard);
                    
                }
            }

    },
    checkBooks: function (hand) {
        // compare numbers same value 
        // filter () or find() google these bitches

        // // write a function that puts the cards in order by value 
        //a book is 4 cards of the same value.
        // once a book is created = 1 point (updated in player/ computer books)
        // those cards are then removed from player/ computer hand 
        // update playerBooks/ computerBooks -> if === 7 game is over alert "Player wins the game!"
        // find all cards of same value (counter variable starts at 0 once it hits 4 removes those cards from array and adds a point)
    }
}
// this is my playerTurn / ask for cards function
function askForCard(event) { 
    // this data types returns as a string in HTML -> use Number()
    let card = Number(event.target.value) 
      //is the element I'm asking for in the computer hand? findIndex() if yes push() and splice() to remove from computerHand array. if undefined alert GO FISH  
    let computerHandIndex = game.computer.computerHand.findIndex(function (computerCardValue){ 
      return card === computerCardValue
    })
    // if not found will return -1 -> if -1 alert GO FISH 
    if (computerHandIndex === -1) {
        alert('GO FISH')
        // then draw a card 
        if (game.deck.length > 1) {
            let card = game.deck.shift();
            game.player.playerHand.push(card);
            console.log(game.deck.length)
            console.log(game.player.playerHand)
            //update player hand in browser
            let container = document.querySelector('.playerHand')
            addCardToHand(card, container)
        } else {
                alert("OUT OF CARDS")
            }
        } else {
            // playerHand gets that card and computerHand loses that card push()
            let container = document.querySelector('.playerHand')  
            game.computer.computerHand.splice(computerHandIndex, 1);
            game.player.playerHand.push(card)
            console.log(game.player.playerHand)
            console.log(game.computer.computerHand)
            // need to add new span with card in playerhand 
            addCardToHand(card, container)
        }
        //start computer turn 
         game.computerTurn()
}
//takes in the value of one card and appends it to the HTML container being passed
function addCardToHand(cardValue, playerHandContainer) {
    let button = document.createElement('button') 
    button.textContent = cardValue
    button.setAttribute('class', `card-${cardValue}`)
    button.setAttribute('value', cardValue)
    playerHandContainer.appendChild(button)
    button.addEventListener('click', askForCard)
}
// start button 
let buttonElement = document.getElementById('start-button') 
buttonElement.addEventListener('click', function () {
    game.deal()
    // disable start button after game begins 
    document.querySelector('button').disabled = true;
    console.log("Player Hand: ", game.player.playerHand)
    console.log("Computer Hand: ", game.computer.computerHand)
    console.log(game.deck)
    let container = document.querySelector('.playerHand')
    console.log(container)
    // for each function === for each of the elements in the array (playerHand) do "this" display the value of the card
    game.player.playerHand.forEach(function (valueOfCard) {
        // show me the cards on the page 
        // each card needs to have its own cladd 
        addCardToHand(valueOfCard, container)
    })
})
game.shuffle()
console.log(game.deck)
