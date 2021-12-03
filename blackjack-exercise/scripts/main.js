window.addEventListener('DOMContentLoaded', function() {
  // Execute after page load
})

/*let suits = ['spades', 'hearts', 'diamonds', 'clubs'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
let deck = [];*/

let url = "images/2_of_clubs.png";

let image = new Image();
image.src = url;
document.getElementById('deal-button').appendChild(image);