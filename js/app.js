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

var restart = function () {

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

// initialize the game
let init = function () {
    //   set moves to 0;
    let moves = 0;
    let openCards = [];

    // shuffle cards
    restart();
};

// set up click event listener for a card
$('.deck').on('click', '.card', function (e) {
    // hide all open class
    $('.card').removeClass('open show');
    // open the clicked card
    $(this).addClass('open show');

    let cardName = $(this).find("fa").className;
    console.log(cardName);

    moves += 1;
});

var checkCardsMatch = function (cardA, cardB) {

};


// click restart button to restart
$('.restart').on('click', function () {
    restart();
});

// Initialize the game
init();