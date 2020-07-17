let game = {
    player: {
        books: 0, // if ===5 alert player wins 
        hand: [] // --- displaying cards in hand, write a function that puts the cards in order by 
        //value numbers only will handle the image of each card in another way
    },
    computer: {
        books: 0, // if === 5 alert computer wins 
        hand: []
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
            this.player.hand.push(cards);
            cards = this.deck.shift();
            this.computer.hand.push(cards);
        //check for books 
        }    
    },

    computerTurn: function () {
        // asks for a card === to the value of a card in their hand
        // changed from .round to .floor to debug undefined -> computer was asking for a card value that was not between 1-13
        let computerAsk = Math.floor(Math.random() * this.computer.hand.length)
        let computerCardValue = this.computer.hand[computerAsk]
        let playerHandIndex = this.player.hand.findIndex(function (playerCardValue){ 
            return computerCardValue === playerCardValue
          })
        // player is prompted give card or tell computer Go Fish (two buttons give card moves card from hand to ComputerHand, second button GO Fish)
        if (playerHandIndex === -1) {
            // then draw a card 
            if (this.deck.length > 1) {
                let card = this.deck.shift();
                this.computer.hand.push(card);
                console.log(this.deck.length)
                console.log("computer turn", this.computer.hand)
                // string interpolation!!!
                alert(`Computer asked for ${computerCardValue} and went fishing!`)
            } else {
                    alert("OUT OF CARDS")
                }
            } else {
                // hand gets that card and hand loses that card push() 
                // updated hand Container to reflect card that was taken 
                this.player.hand.splice(playerHandIndex, 1);
                this.computer.hand.push(computerCardValue)
                console.log("after computer turn players hand", this.player.hand)
                console.log("computer turn", this.computer.hand)
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
            this.checkBooks(this.computer)
            console.log("computer turn/ computer hand", this.computer.hand)
          

    },

    checkBooks: function (player, playerType) {
        //a book is 4 cards of the same value.
        // compare numbers same value 
        // filter () or find() google these bitches
    
        for (let i=1; i<=13; i++) {
           const likeCards = player.hand.filter(card => card === i)
           if (likeCards.length === 4) {
            player.books += 1
            // DOM to update score on the browser
            console.log("player score", this.player.books)
            console.log("computer score", this.computer.books)
            player.hand = player.hand.filter(card => card != i)
            
            if (playerType === 'player') {
            let score = document.getElementById('player-books')
            score.textContent = `${player.books}`
             this.updateHtmlPlayerHandContainer(i)
             alert("You just got a BOOK!")
             console.log("player just scored a book!")
            } else {
                let score = document.getElementById('computer-books')
            score.textContent = `${player.books}`
             alert("The Computer just got a BOOK, better catch up!")
             console.log("computer just scored a book!")
            }
           }
       
           if (this.player.books >= 7) {
               
            alert("Player WINS!")
        } else if (this.computer.books >= 7) {
            alert("Computer WINS!")
        }

        }
        // once a book is created = 1 point (updated in player/ computer books)
     
        // those cards are then removed from player/ computer hand 
      
    },
    // html element that represents the card the computer took aka node aka "removedCard"
    updateHtmlPlayerHandContainer: function (i) {
       console.log("updateHtmlPlayerHandContainer is being called")
    let removedCards = document.querySelectorAll(`.card-${i}`);
    console.log(removedCards)
    console.log(`.card-${i}`)
    removedCards.forEach(removedCard => {
        if (removedCard.parentNode) {
            removedCard.parentNode.removeChild(removedCard);
        }
    })
  }
}
// this is my playerTurn / ask for cards function
function askForCard(event) { 
    // this data types returns as a string in HTML -> use Number()
    let card = Number(event.target.value) 
      //is the element I'm asking for in the computer hand? findIndex() if yes push() and splice() to remove from hand array. if undefined alert GO FISH  
    let computerHandIndex = game.computer.hand.findIndex(function (computerCardValue){ 
      return card === computerCardValue
    })
    // if not found will return -1 -> if -1 alert GO FISH 
    if (computerHandIndex === -1 || game.player.hand === 0) {
        alert('GO FISH')
        // then draw a card 
        if (game.deck.length > 1) {
            let card = game.deck.shift();
            game.player.hand.push(card);
            console.log(game.deck.length)
            console.log(game.player.hand)
            //update player hand in browser
            let container = document.querySelector('.playerHand')
            addCardToHand(card, container)
        } else {
                alert("OUT OF CARDS")
        }
    } else {
        // player hand gets that card and computer hand loses that card push()
        let container = document.querySelector('.playerHand')  
        game.computer.hand.splice(computerHandIndex, 1);
        game.player.hand.push(card)
        console.log(game.player.hand)
        console.log(game.computer.hand)
        // need to add new span with card in playerhand 
        addCardToHand(card, container)
        
    }
    //start computer turn 
    game.checkBooks(game.player, "player")
    console.log("player turn/ player hand", game.player.hand)
    // add alert that describes player turn 
    //set time out so the user sees their new card added before seeing the alert of the computer turn 
    setTimeout(()=> game.computerTurn(), 300)
    
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
    console.log("Player Hand: ", game.player.hand)
    console.log("Computer Hand: ", game.computer.hand)
    console.log(game.deck)
    let container = document.querySelector('.playerHand')
    console.log(container)
    // for each function === for each of the elements in the array (hand) do "this" display the value of the card
    game.player.hand.forEach(function (valueOfCard) {
        // show me the cards on the page 
        // each card needs to have its own cladd 
        addCardToHand(valueOfCard, container)
    })
    game.checkBooks(game.player, 'player')
    game.checkBooks(game.computer)
})

game.shuffle()
console.log(game.deck)
