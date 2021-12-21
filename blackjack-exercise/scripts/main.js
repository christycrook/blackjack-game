function deal(deck, target) {
  const currentCard = deck.pop();
  target.push(currentCard);
}

function buildDeck() {
  let deck = [];
  let suits = ['clubs', 'spades', 'hearts', 'diamonds'];
  let rank = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < rank.length; j++) {
      let card = {rank: rank[j], suit: suits[i]};
      deck.push(card);
    }
  }
  shuffle(deck);
  return deck;
}

  let isGameOver = false;
  let dealerHand = [];
  let playerHand = [];
  let gameDeck = buildDeck;

  const dealButton = document.querySelector('#deal-button');
  dealButton.addEventListener('click', function() {
    dealButton.setAttribute('disabled', true);
    dealPlayerHand();
    dealDealerHand();
  })

  const hitButton = document.querySelector('#hit-button');
  hitButton.addEventListener('click', function() {
    dealPlayerHand();
    checkBusts();
    renderDealer(isGameOver);
    renderPlayer(isGameOver);
  })

  const standButton = document.querySelector('#stand-button');
  standButton.addEventListener('click', function() {
    let dealerPoints = calculatePoints(dealerHand);
    while (dealerPoints < 17) {
      dealDealerHand();
      dealerPoints = calculatePoints(dealerHand);
    }
    checkWinner();
    renderDealer(isGameOver);
    renderPlayer(isGameOver);
  })

  function dealDealerHand() {
    const currentCard = shuffle(deck);
    dealerHand.push(currentCard)
  } 

  function dealPlayerHand() {
    const currentCard = shuffle(deck);
    playerHand.push(currentCard)
  }

  let deck = buildDeck();
  function dealDeck() {
    let dealerHand = [];
    let playerHand = [];
    shuffle(deck);

    for (let i = 0; i < dealerHand.length; i++) {
      const card = dealerHand[i];
      const cardElement = getCardImage(card)
      dealerHandElement.appendChild(cardElement);
    }

    for (let i = 0; i < playerHand.length; i++) {
      const card = playerHand[i];
      const cardElement = getCardImage(card)
      playerHandElement.appendChild(cardElement);
    }
  }

  function getCardImage(card) {
    const cardImage = document.createElement('img');
    if (card.rank === 1) {
      cardImage.setAttribute('src', `../images/ace_of_${card.suit}.png`);
    } else if (card.rank === 11) {
      cardImage.setAttribute('src', `../images/jack_of_${card.suit}.png`);
    } else if (card.rank === 12) {
      cardImage.setAttribute('src', `../images/queen_of_${card.suit}.png`);
    } else if (card.rank === 13) {
      cardImage.setAttribute('src', `../images/king_of_${card.suit}.png`);
    } else {
      cardImage.setAttribute('src', `../images/${card.rank}_of_${card.suit}.png`);
    }
    return cardImage
  }

  function renderDealer(isGameOver) {
    const dealerHandElement = document.querySelector('#dealer-hand');
    dealerHandElement.innerHTML = ''
    
    const dealerPoints = calculatePoints(dealerHand);
    document.querySelector('#dealer-points').textContent = dealerPoints;
  
    if (isGameOver) {
      const hitButton = document.querySelector('#hit-button');
      const standButton = document.querySelector('#stand-button');
      hitButton.setAttribute('disabled', true);
      standButton.setAttribute('disabled', true);
    }
  }

  function renderPlayer(isGameOver) {
    const playerHandElement = document.querySelector('#player-hand');
    playerHandElement.innerHTML = ''

    const playerPoints = calculatePoints(playerHand);
    document.querySelector('#player-points').textContent = playerPoints;

    if (isGameOver) {
      const hitButton = document.querySelector('#hit-button');
      const standButton = document.querySelector('#stand-button');
      hitButton.setAttribute('disabled', true);
      standButton.setAttribute('disabled', true);
    }    
  }

  function shuffle(deck) {
    for (let i = 0; i < deck.length; i++) {
      const randIndex = Math.floor(Math.random() * deck.length);
      const temporary = deck[i]
      deck[i] = deck[randIndex];
      deck[randIndex] = temporary;
    }
    return;
  }

  function calculatePoints(deck) {
    let points = 0;
    let aces = 0;
  
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
  
    while (points > 21 && aces > 0) {
      points -= 10;
      aces--;
    }
    return points;
  }

  function checkBusts() {
    const playerPoints = calculatePoints(playerHand);
    const dealerPoints = calculatePoints(dealerHand);
  
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
    
  const playerPoints = calculatePoints(playerHand);
  const dealerPoints = calculatePoints(dealerHand);

  if (playerPoints === 21 && dealerPoints < 21) {
    message('Player has 21. Player wins');
    isGameOver = true;
  }
  renderDealer(isGameOver);
  renderPlayer(isGameOver);
