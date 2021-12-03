window.addEventListener('DOMContentLoaded', function() {
  function deal(deck, target) {
    const currentCard = deck.pop();
    target.push(currentCard);
  }
  
  function getCardImage(card) {
    const cardImage = document.createElement('img');
    if (card.rank === 1) { // 1 = ace
      cardImage.setAttribute('src', `images/ace_of_${card.suit}.png`);
    } else if (card.rank === 11) { // 11 = jack
      cardImage.setAttribute('src', `images/jack_of_${card.suit}.png`);
    } else if (card.rank === 12) { // 12 = queen
      cardImage.setAttribute('src', `images/queen_of_${card.suit}.png`);
    } else if (card.rank === 13) { // 13 = king
      cardImage.setAttribute('src', `images/king_of_${card.suit}.png`);
    } else { // otherwise, it's a number card
      cardImage.setAttribute('src', `images/${card.rank}_of_${card.suit}.png`);
    }
    return cardImage
  }
  
  function render(isGameOver) {
    const dealerHandElement = document.querySelector('#dealer-hand');
    const playerHandElement = document.querySelector('#player-hand');
    dealerHandElement.innerHTML = ''
    playerHandElement.innerHTML = ''
  
    // for each card in the dealer hand
    for (let index = 0; index < dealerHand.length; index++) {
      const card = dealerHand[index];
      const cardElement = getCardImage(card)
      dealerHandElement.appendChild(cardElement);
    }
    // do the same for the player hand
    for (let index = 0; index < playerHand.length; index++) {
      const card = playerHand[index];
      const cardElement = getCardImage(card)
      playerHandElement.appendChild(cardElement);
    }
  
    // calculate the player points
    const playerPoints = calculatePoints(playerHand);
    document.querySelector('#player-points').textContent = playerPoints;
    
    // do the same for the dealer
    const dealerPoints = calculatePoints(dealerHand);
    document.querySelector('#dealer-points').textContent = dealerPoints;
  
    // if we told the render function that the game is over
    if (isGameOver) {
      const hitButton = document.querySelector('#hit-button');
      const standButton = document.querySelector('#stand-button');
      hitButton.setAttribute('disabled', true);
      standButton.setAttribute('disabled', true);
    }
  }
  
  function generateDeck() {
    let deck = [];
  
    // set up our suits
    const suits = [
      'clubs',
      'spades',
      'hearts',
      'diamonds'
    ]
  
    // for each suit
    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      const suit = suits[suitIndex];
      for (let rank = 1; rank <= 13; rank++) {
        const card = {
          rank: rank,
          suit: suit,
        };
        deck.push(card);
      }
    }
    // shuffle the deck array
    shuffle(deck)
    return deck;
  }
  
  function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
      const randIndex = Math.floor(Math.random() * i);
      const temporary = deck[i]
      deck[i] = deck[randIndex];
      deck[randIndex] = temporary;
    }
  }
  
  function calculatePoints(deck) {
    let points = 0;
    let aces = 0;
  
    // for each card in the hand
    for (let i = 0; i < deck.length; i++) {
      const currentCard = deck[i];
  
      if (currentCard.rank > 1 && currentCard.rank < 11) {
        points += currentCard.rank;
      } else if (currentCard.rank >= 11) {
        points += 10;
      } else if (currentCard.rank === 1) {
        aces++;
        points += 11;
      }
    }
  
    // for as long as the points are > 21 (bust) and as long as we have aces to count
    while (points > 21 && aces > 0) {
      points -= 10;
      aces--;
    }
    return points;
  }
  
  function checkBusts() {
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);
  
    // check busts (points > 21)
    if (playerPoints > 21) {
      message('Player Bust. Dealer Wins');
      isGameOver = true;
    } else if (dealerPoints > 21) {
      message('Dealer Bust. Player Wins');
      isGameOver = true;
    }
  }
  
  function checkWinner() {
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);
    
    // check points (higher value)
    if (dealerPoints >= 17 && playerPoints >= dealerPoints && playerPoints >= 21) {
      message('Player Wins')
      isGameOver = true;
    } else if (dealerPoints > playerPoints) {
      message('Dealer Wins')
      isGameOver = true;
    } else if (dealerPoints < playerPoints) {
      message('Player Wins')
      isGameOver = true;
    } else if (dealerPoints === playerPoints) {
      message('Draw')
      isGameOver = true;
    }
  }
  
  function message(text) {
    document.querySelector('#messages').textContent = text
  }

  let isGameOver = false;
  let dealerHand = [];
  let playerHand = [];
  let gameDeck = generateDeck();

  // find the deal button
  const dealButton = document.querySelector('#deal-button');
  dealButton.addEventListener('click', function() {
    // disable the deal button
    dealButton.setAttribute('disabled', true);
    // deal to the dealer and the player
    deal(gameDeck, playerHand);
    deal(gameDeck, dealerHand);
    deal(gameDeck, playerHand);
    deal(gameDeck, dealerHand);
    
    // calculate the points
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);

    // player has 21
    if (playerPoints === 21 && dealerPoints < 21) {
      message('Player has 21. Player wins');
      isGameOver = true;
    }
    render(isGameOver);
  })

  // find the hit button
  const hitButton = document.querySelector('#hit-button');
  hitButton.addEventListener('click', function() {
    // deal to the player
    deal(gameDeck, playerHand);
    // check if anyone busted
    checkBusts();
    render(isGameOver);
  })

  // find the stand button
  const standButton = document.querySelector('#stand-button');
  standButton.addEventListener('click', function() {
    let dealerPoints = calculatePoints(dealerHand);
    // As long as the dealer has less than 17
    while (dealerPoints < 17) {
      deal(gameDeck, dealerHand);
      // update dealer points
      dealerPoints = calculatePoints(dealerHand);
    }
    // check if anyone has won
    checkWinner();
    render(isGameOver);
  })

  
})
