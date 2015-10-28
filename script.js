

//Card constructor///


function Card(suit, number) {
  var suit = suit;
  var number = number;
  //returns number of card (1-52)
  this.getNumber = function() {
    return number;
  };
  //returns name of suit (Hearts, clubs, spades, diamonds)
  this.getSuit = function() {
    var suitName = '';
    switch(suit) {
        case 1:
            suitName = "Hearts";
            break;
        case 2:
            suitName = "Clubs";
            break;
        case 3:
            suitName = "Spades";
            break;
        case 4:
            suitName = "Diamonds";
            break;
    }
    return suitName;
  };
  //returns HTML-encoded symbol of suit
  this.getSymbol = function() {
    var suitName = '';
    switch(suit) {
        case 1:
            suitName = "&hearts;";
            break;
        case 2:
            suitName = "&clubs;";
            break;
        case 3:
            suitName = "&spades;";
            break;
        case 4:
            suitName = "&diams;";
            break;
    }
    return suitName;
  };
  //returns value of card
  this.getValue = function() {
      if (this.getNumber() > 10) {
      return 10;
 }
      else if (this.getNumber() === 1) {
      return 11;
 }
 else {
      return this.getNumber();
 }
};
  //returns full name of card ("4 of Hearts")
  this.getName = function() {
      var cardName = '';
      switch(number) {
          case 1:
              cardName = "A";
              break;
          case 13:
              cardName = "K";
              break;
          case 12:
              cardName = "Q";
              break;
          case 11:
              cardName = "J";
              break;
          default:
              cardName = number;
              break;
      }
    return cardName + this.getSymbol();
  };
};


//Deck constructor
var Deck = function() {
  var cards = [];
  //creates a new set of cards
  var newCards = function() {
    var i,
        suit,
        number;
    for (i=0; i<52; i++) {
        suit= (i%4)+1;
        number = (i%13)+1;
        cards.push(new Card(suit,number));
    }
  };

  //Create new cards
  newCards();
  //shuffles cards, returns array of Cards that are shuffled version of Deck
  this.shuffle = function() {
      for (var j, k, i = cards.length; i; j = parseInt(Math.random() * i), k = cards[--i], cards[i] = cards [j], cards[j] = k);
        return cards;
    };

  //returns array of cards representing the Deck
  this.getCards = function (){
        return cards;
    };
  //deal top card off deck, then remove it from deck
  this.deal = function() {
      if (!cards.length) {
          console.log("Ran out of cards, new deck");
          newCards();
          this.shuffle();
      }
    return cards.pop();
  };
};

//Hand constructor
function Hand (deck) {
  var cards = [];

  //Deal 2 cards to Player
  cards.push( deck.deal(), deck.deal());

  //returns array of Cards (Hand)
  this.getHand = function() {
      return cards;
  };

  // returns score of Hand
  this.score = function() {
      var i,
          score = 0,
          cardVal = 0, //stores Card's value
          aces = 0; //stores # aces in Hand
  for (i=0;i<cards.length; i++) {
      cardVal = cards[i].getValue();
      if (cardVal == 11) {
          aces += 1;
      }
      score += cardVal;
  }
  // Check to see if Aces should be 1 or 11
  while (score > 21 && aces > 0) {
    score -= 10;
    aces -=1;
  }
  return score;
};
  // returns array of Card names in userHand
  this.printHand = function() {
    var arrayOut = [],
        i;

    for (i=0;i<cards.length;i++) {
        arrayOut.push(cards[i].getName());
    }
    return arrayOut.join();
  };


  //Adds card from deck into Hand
  this.hitMe = function() {
      cards.push(deck.deal());
    };
  //Adds card from deck into dealerHand

  // returns symbols (HTML representations) of Cards in user Hand
  this.toHtml = function() {
    var arrayOut = [],
        i;
    for (i=0;i<cards.length;i++) {
        arrayOut.push('<div class="card ',cards[i].getSuit(),' ',cards[i].getNumber(),'">',cards[i].getName(),'</div>');
    }
    return arrayOut.join('');
};
};

// $( "#dialogWin" ).dialog({
//   modal: true;
//   autoOpen: false;
// })
// $( "#dialogLose" ).dialog({
//   modal: true;
//   autoOpen: false;
// });
// $( "#dialogPush" ).dialog({
//   modal: true;
//   autoOpen: false;
// });
//

//Play Functions
var BlackJack = (function ($) {
  //Set up Deck
  var deck = new Deck();

  //win lose ratio
  var wins = 0;
  var losses = 0;

  //Tally score to determine outcome
  var declareWinner = function (userHand, dealerHand) {
      var outcome = '';
          dealerScore = dealerHand.score(),
          userScore = userHand.score();

      //Win Loss rules
      if (userScore === 21 && dealerScore < 21) {
          outcome = "You win!";
          // $( "#dialogWin" ).dialog("open");
          wins++;
      } else if (userScore > 21 || dealerScore === 21) {
          outcome = "You lose!";
          // $( "#dialogLose" ).dialog("open");
          losses++;
      }else if (dealerScore > 21 && userScore <=21) {
          outcome = "You win!";
          // $( "#dialogWin" ).dialog("open");
          wins++;
      }else if (dealerScore > 21 || userScore > dealerScore) {
          outcome = "You win!";
          // $( "#dialogWin" ).dialog("open");
          wins++;
      }else if (dealerScore > userScore) {
          outcome = "You lose!";
          // $( "#dialogLose" ).dialog("open");
          losses++;
      }else if (dealerScore === userScore) {
          outcome = "Push!";
          // $( "#dialogPush" ).dialog("open");
      }
      //Output result of round
      return outcome+"<br />Dealer: "+dealerScore+"<br />You: "+userScore;
};

// var outcome2 = function() {
//       if (outcome = "You win!") {
//         $(document).ready(function(){
//         $("#dialogWin").dialog();
//         autoOpen: false;
//         });
//         }
//       if (outcome = "You lose!") {
//         $(document).ready(function(){
//         $("#dialogLose").dialog();
//         autoOpen: false;
//         });
//         }
//       if (outcome = "Push!") {
//         $(document).ready(function(){
//         $("#dialogPush").dialog();
//         autoOpen: false;
//         });
//         }
//         };
//           outcome2();
//



  //Dealer rules: dealer has hit until reaches at least 17; at 17, dealer must stay


// Holds your Hand
var userHand;
// var dealerHand = dealerHand();


//SELECTORS
var $hitButton = $("#hitMe")
    $stayButton = $("#stay"),
    $dealButton = $("#deal"),
    $score = $("#userScore"),
    $userHand = $('#userHand'),
    $dealerHand = $('#dealerHand');

    /** Show the Deal button, hide others. */
      var showDeal = function() {
          $hitButton.hide();
          $stayButton.hide();
          //$score.hide();
          $dealButton.show();
      };

      /** Show the control buttons, hide Deal. */
      var showControls = function() {
          $hitButton.show();
          $stayButton.show();
         // $score.show();
          $dealButton.hide();
      };

      /** Update your score and card display. */
      var updateUS = function() {
          /* Cards */
          $userHand.html(userHand.toHtml());
          $dealerHand.html(dealerHand.toHtml());
          /* Score */
          $score.find(".digits").html(userHand.score());
          $("#wins").text(wins);
          $("#losses").text(losses);
      };

      /* Deal Button */
      $dealButton.on('click', function() {
          userHand = new Hand(deck);
          dealerHand = new Hand(deck);
          updateUS();
          showControls();
      });


      /* Hit Button */
      $hitButton.on('click', function() {
          userHand.hitMe();
          if (userHand.score() > 21){
              $stayButton.trigger('click');
          }else{
              updateUS();
          }
      });

      /* Stay Button */
      $stayButton.on('click', function (){
          if (dealerHand.score() < 17) {
                 dealerHand.hitMe();
                 updateUS();
              } else {
                $userHand.html(declareWinner(userHand, dealerHand));
                showDeal();
              }
        });


      /* Shuffles deck. */
      deck.shuffle();
}(jQuery));
