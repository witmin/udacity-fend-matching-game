/*
 * Create a list that holds all of your cards
 */
const cards = ["diamond", "diamond", "paper-plane", "paper-plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var shuffleCards = function () {

    // Shuffle cards
    let newSetOfCards = shuffle(cards);

    // define deck
    const deck = $('.deck').empty();

    // loop through each card and create its HTML
    for (let card of newSetOfCards) {
        // set basic HTML of a card
        let cardContainer = $('<li class="card"><i class="fa" aria-hidden="true"></i></li>');

        // add card to deck
        deck.append(cardContainer);

        // display card symbol the icon class of the card
        let iconClass = "fa-" + card;

        // add icon class to the card
        cardContainer.find('.fa').addClass(iconClass);
    }
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let moves = 0;

// set up click event listener for a card
$('.deck').on('click', '.card', function (e) {
    // open the clicked card
    let clickedCard = $(event.target);

    showCard(clickedCard);

    setTimeout(function () {
        checkCards(clickedCard);
    }, 500);

    updateMoves();

});

// display the card's symbol
let showCard = function (card) {
    card.addClass('open show');
};

// add the card to a *list* of "open" cards
let checkCards = function (card) {
    // get symbol of the card
    let cardSymbol = card.children('i').attr('class').replace('fa ', '');

    // check if there are two cards opened for comparison
    if (openCards.length > 0) {
        openCards.push(card);

        // get the last card
        let lastCard = openCards[openCards.length - 2];
        // get symbol of the last card
        let lastCardSymbol = lastCard.children('i').attr('class').replace('fa ', '');

        // if match
        if (lastCardSymbol === cardSymbol) {
            // lock card
            lockCard(card);
            lockCard(lastCard);
            // reset openCards
            openCards = [];
        } else {
            // else if not match
            hideCard(card, openCards);
            hideCard(lastCard, openCards);
        }
    } else{
        // if only one card opened, add card to the open list
        openCards.push(card);
    }
};

// Lock lat opened card if matched an opened card
let lockCard = function (card) {
    // add "match" class to the card li
    card.removeClass("open show");
    card.addClass("match");
};

// remove the cards from the list and hide the card's symbol if doesn't match
let hideCard = function (card, openCards) {
    card.removeClass("open show");
    openCards.pop();
};


/*
*
* move counter
*
*/
let initMoves = function() {
    moves = 0;
    $('span.moves').text(moves);
};
let updateMoves = function () {
    moves ++;
    $('.moves').text(moves);
};


/* Initialize and restart */
// initialize the game
let init = function () {
    openCards = [];

    initMoves();
    // shuffle cards
    shuffleCards();
};

// click restart button to initialize the game
$('.restart').on('click', function () {
    init();
});

// Initialize the game
$(function () {
    init();
});
