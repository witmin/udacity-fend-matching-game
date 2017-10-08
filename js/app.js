/**
 * Define the cards symbols
 * @type {Array}
 */
const cards = ["diamond", "diamond", "paper-plane", "paper-plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

/**
 * Define the global variables
 * @type {Array} openCards - to hold opened cards for comparison
 * @type {number} moves - how many pairs of moves the user makes, the initial moves should be 0
 * @type {number} stars - less moves brings more stars, it should have 3 starts at the beginning
 */

let openCards = [];
let moves = 0;
let stars = 3;

/**
 * Define the global variables for timer value display
 * @type {number} seconds, minutes and nours
 */
let seconds = 0;
let minutes = 0;
let hours = 0;

/**
 * @description shuffle array
 * @param {Array} array - list of items to be shuffled
 * @returns a new set of cards in different sequence
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/**
 * @description shuffle cards
 */
function shuffleCards() {
    // Shuffle cards
    let newSetOfCards = shuffle(cards);

    // reset open cards list
    openCards = [];

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
}

/**
 * @description click a card on the deck to show and check the matching of cards
 */
$('.deck').on('click', '.card', function (event) {
    // open the clicked card
    let clickedCard = $(event.target);

    showCard(clickedCard);

    setTimeout(function () {
        checkCards(clickedCard);
    }, 600);

});

/**
 * @description show card
 * @param {string} card - clicked card which should be opened
 */
function showCard(card) {
    card.addClass('open show');
}

/**
 * @description check if the just opened card matches the last opened card
 * @param {string} card - just opened/clicked card
 */
function checkCards(card) {
    // get symbol of the card
    let cardSymbol = card.children('i').attr('class');

    // check if there are two cards opened for comparison
    if (openCards.length > 0) {
        openCards.push(card);

        // get the last card
        let lastCard = openCards[openCards.length - 2];
        // get symbol of the last card
        let lastCardSymbol = lastCard.children('i').attr('class');

        // if match
        if (lastCardSymbol === cardSymbol) {
            // lock card
            lockCard(card);
            lockCard(lastCard);
            // reset openCards
            openCards = [];
            // check if win
            checkMatched();
        } else {
            // else if not match
            hideCard(card, openCards);
            hideCard(lastCard, openCards);
        }
        updateMoves();
    } else {
        // if only one card opened, add card to the open list
        openCards.push(card);
    }
}

/**
 * @description Lock last opened card and set its status to 'match'
 * @param {string} card - a card to be marked as matched
 */
function lockCard(card) {
    // add "match" class to the card li
    card.removeClass("open show");
    card.addClass("match");
}

/**
 * @description remove a card from the open card list and hide the card's symbol when not match
 * @param {String} card - a card to be marked as matched
 * @param {Array} openCards - a list of open cards for match checking
 */
function hideCard(card, openCards) {
    card.addClass("not-match");
    setTimeout(function () {
        card.removeClass("open show not-match");
        openCards.pop();
    }, 400);
}

/**
 * @description check if all cards matched, toggle the display of the win message modal
 */
function checkMatched() {
    let matchedNum = $('.match').length;

    if(matchedNum === $('.deck li').length){
        timer.stop();
        $(".container").hide();
        $(".win-container").show();
    } else{
        $(".container").show();
        $(".win-container").hide();
    }
}

/**
 * @description initialize moves value
 */
function initMoves() {
    moves = 0;
    $('.moves').text(moves);
}
/**
 * @description update moves value and call to update stars
 */
function updateMoves() {
    moves++;
    $('.moves').text(moves);
    updateStars();
}

/**
 * @description initialize stars number and icon in HTML
 */
function initStars() {
    stars = 3;
    $('.stars i').removeClass("fa-star-o");
    $('.stars i').addClass("fa-star");
    updateStars();
}

/**
 * @description define the rules on the number os stars and update stars on the view
 */
function updateStars() {
    // if moves <=12 with 3 starts
    if (moves <= 12) {
        $('.stars .fa').addClass("fa-star");
        stars = 3;
    } else if(moves >= 13 && moves <= 14){
        $('.stars li:last-child .fa').removeClass("fa-star");
        $('.stars li:last-child .fa').addClass("fa-star-o");
        stars = 2;
    } else if (moves >= 15 && moves <20){
        $('.stars li:nth-child(2) .fa').removeClass("fa-star");
        $('.stars li:nth-child(2) .fa').addClass("fa-star-o");
        stars = 1;
    } else if (moves >=20){
        $('.stars li .fa').removeClass("fa-star");
        $('.stars li .fa').addClass("fa-star-o");
        stars = 0;
    }
    $('.win-container .stars-number').text(stars);

}


/**
 * @description initialise the timer with easyTimer.js from https://github.com/albert-gonzalez/easytimer.js by Albert Gonzalez
 * @constructor Timer
 */
let timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('time').html(timer.getTimeValues().toString());
});

/**
 * @description initialize the game
 */
function init() {
    initMoves();
    initStars();
    // shuffle cards
    shuffleCards();
    timer.start();
    checkMatched();
}

/**
 * @description reset the game and timer by clicking restart button.
 */
$('.restart').on('click', function (event) {
    event.preventDefault();
    timer.reset();
    init();
});

/**
 * @description initialise the game on page loading.
 */
$(function () {
    init();
});