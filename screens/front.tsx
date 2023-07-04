/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const CardRanks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
];
const CardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const Suits = ['♠', '♦', '♥', '♣'];
type Card = {
  value: number;
  suit: string;
  rank: string;
};

const generateDeck = () => {
  const deck = [];
  for (const suit of Suits) {
    for (const value of CardValues) {
      const cardObj: Card = {
        suit,
        rank: CardRanks[CardValues.indexOf(value)],
        value,
      };
      deck.push(cardObj);
    }
  }
  return deck;
};

const shuffleDeck = (deck: Card[]) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};

function checkFlush(cards: Card[]) {
  for (let index = 1; index < cards.length; index++) {
    if (cards[index].suit !== cards[index - 1].suit) {
      return false;
    }
  }
  return true;
}

function tallyCards(cards: Card[]) {
  const counts: object = {};
  for (const card of cards) {
    counts[card.value] = counts[card.value] ? counts[card.value] + 1 : 1;
  }
  return counts;
}

function checkPair(cards: Card[]) {
  const tally = tallyCards(cards);

  if (Object.keys(tally).length === cards.length) {
    return 0;
  } else if (Object.keys(tally).length === cards.length - 1) {
    return 2; //p
  } else if (Object.keys(tally).length === cards.length - 2) {
    if (Object.values(tally).includes(3)) {
      return 4; // 3ok
    }
    return 3; //2p
  } else if (
    Object.keys(tally).length === 2 &&
    Object.values(tally).includes(4)
  ) {
    return 8; //4k
  }
  return 7; //fh
}

function checkStraight(cards: Card[]) {
  const cardValues = cards.map(x => x.value);

  const sortedCardValues = cardValues.sort(function(a,b) {
    return (+a) - (+b);
  });

  for (let index = 0; index < sortedCardValues.length - 1; index++) {
    if (
      sortedCardValues[sortedCardValues.length - 1] === 14 &&
      sortedCardValues[0] === 2 &&
      sortedCardValues[1] === 3
    ) {
      return {straight: true, highest: sortedCardValues[sortedCardValues.length - 1]};
    }
    if (sortedCardValues[index] + 1 !== sortedCardValues[index + 1]) {
      return {straight: false, highest: sortedCardValues[sortedCardValues.length - 1]};
    }
  }
  return {straight: true, highest: sortedCardValues[sortedCardValues.length - 1]};
}

const calculateHand = (cards: Card[]) => {
  const isFlush = checkFlush(cards);
  const straightObj = checkStraight(cards);
  const highestCard = straightObj.highest;
  const isStraight  = straightObj.straight;

  const pair = checkPair(cards);

  if (isFlush && isStraight) {
    return {ranking: 'Straight Flush', score: 10};
  } else if (isFlush) {
    return {ranking: 'Flush', score: 6};
  } else if (isStraight) {
    return {ranking: 'Straight', score: 5};
  }
  else if (pair > 1) {
    return {ranking: 'Pairs', score: 5};
  }

  const index = CardValues.indexOf(highestCard);

  const highestCardRank = CardRanks[index];

  return {ranking: `${highestCardRank}-high`, score: 0};
};

const PokerGame: React.FC = () => {
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [jackpotHand, setJackpotHand] = useState<Card[]>([]);
  const [fullDeck, setFullDeck] = useState<Card[]>([]);

  const [showCard1, setShowCard1] = useState<boolean>(false);
  const [showCard2, setShowCard2] = useState<boolean>(false);
  const [showCard3, setShowCard3] = useState<boolean>(false);
  const [showCard4, setShowCard4] = useState<boolean>(false);
  const [showCard5, setShowCard5] = useState<boolean>(false);
  const [showCard6, setShowCard6] = useState<boolean>(false);
  const [showCard7, setShowCard7] = useState<boolean>(false);
  const [showCard0, setShowCard0] = useState<boolean>(false);

  const [result, setResult] = useState<boolean>(
    null,
  );
  const [playerResult, setPlayerResult] = useState<{
    ranking: string;
    score: number;
  } | null>(null);
  const [dealerResult, setDealerResult] = useState<{
    ranking: string;
    score: number;
  } | null>(null);

  useEffect(() => {
    const originalDeck = generateDeck();
    setFullDeck(originalDeck);
    setDealerResult(null);
    setPlayerResult(null);
  }, []);

  function flipCard(index: number) {
    switch (index) {
      case 0:
        setShowCard0(!showCard0);
        break;
      case 1:
        setShowCard1(!showCard1);
        break;
      case 2:
        setShowCard2(!showCard2);
        break;
      case 3:
        setShowCard3(!showCard3);
        break;
      case 4:
        setShowCard4(!showCard4);
        break;
      case 5:
        setShowCard5(!showCard5);
        break;
      case 6:
        setShowCard6(!showCard6);
        break;
      case 7:
        setShowCard7(!showCard7);
        break;
      default:
        setShowCard0(false);
        setShowCard1(false);
        setShowCard2(false);
        setShowCard3(false);
        setShowCard4(false);
        setShowCard5(false);
        setShowCard6(false);
        setShowCard7(false);
        break;
    }
  }

  function showDealerCard() {
    setShowCard0(true);
    setShowCard1(true);
    setShowCard2(true);
    setTimeout(() => {
      setShowCard3(true);
    }, 300);
    setTimeout(() => {
      setShowCard4(true);
    }, 600);
    setTimeout(() => {
      setShowCard5(true);
    }, 900);
    setTimeout(() => {
      setShowCard6(true);
    }, 1200);
    setTimeout(() => {
      setShowCard7(true);
    }, 1500);
    setTimeout(() => {
      setResult(true);
    }, 2000);
  }

  const dealCards = () => {
    const shuffledDeck = shuffleDeck(fullDeck);

    flipCard(9);
    setResult(false);

    setPlayerHand(shuffledDeck.slice(0, 3));
    setDealerHand(shuffledDeck.slice(3, 6));
    setJackpotHand(shuffledDeck.slice(6, 8));
    setDealerResult(calculateHand(shuffledDeck.slice(3, 6)));
    setPlayerResult(calculateHand(shuffledDeck.slice(0, 3)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3-Card Poker Game</Text>
      <View style={styles.body}>
        {dealerHand.length > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Dealer Hand:</Text>
            <View style={styles.cardView}>
              <View style={styles.cardFrame}>
                <Text style={styles.cardFont}>
                  {!showCard3 ? '' : dealerHand[0].rank + dealerHand[0].suit}
                </Text>
              </View>
              <View style={styles.cardFrame}>
                <Text style={styles.cardFont}>
                  {!showCard4 ? '' : dealerHand[1].rank + dealerHand[1].suit}
                </Text>
              </View>
              <View style={styles.cardFrame}>
                <Text style={styles.cardFont}>
                  {!showCard5 ? '' : dealerHand[2].rank + dealerHand[2].suit}
                </Text>
              </View>
              <View style={styles.centrify}>
                <Text> - </Text>
              </View>
              <View style={styles.cardFrame}>
                <Text style={styles.cardFont}>
                  {!showCard6 ? '' : jackpotHand[0].rank + jackpotHand[0].suit}
                </Text>
              </View>
              <View style={styles.cardFrame}>
                <Text style={styles.cardFont}>
                  {!showCard7 ? '' : jackpotHand[1].rank + jackpotHand[1].suit}
                </Text>
              </View>
            </View>
            <Text style={styles.resultText}>
              {result ? dealerResult?.ranking : null}
            </Text>
          </View>
        )}
        {playerHand.length > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Player Hand:</Text>
            <View style={styles.cardView}>
              <View>
                <TouchableOpacity
                  style={styles.cardFrame}
                  onPress={() => flipCard(0)}>
                  <Text style={styles.cardFont}>
                    {!showCard0 ? '' : playerHand[0].rank + playerHand[0].suit}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cardFrame}
                  onPress={() => flipCard(1)}>
                  <Text style={styles.cardFont}>
                    {!showCard1 ? '' : playerHand[1].rank + playerHand[1].suit}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.cardFrame}
                  onPress={() => flipCard(2)}>
                  <Text style={styles.cardFont}>
                    {!showCard2 ? '' : playerHand[2].rank + playerHand[2].suit}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.resultText}>
              {result ? playerResult?.ranking : null}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.end}>
        <View style={styles.rowFlex}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Bonus"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ante"
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={'Pair \n Plus'}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ante"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => dealCards()}>
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.button2} onPress={() => showDealerCard()}>
            <Text>bet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text>fold</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  button2: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 10,
    minWidth: 30,
    minHeight: 20,
    margin: 2,
  },
  body: {
    flex: 3,
    //backgroundColor: 'yellow',
    //justifyContent: 'center',
  },
  end: {
    flex: 2,
    backgroundColor: 'aqua',
    justifyContent: 'center',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  cardView: {
    flexDirection: 'row',
  },
  cardFrame: {
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 4,
    width: 70,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFont: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
  },
  centrify: {
    justifyContent: 'center',
  }
});

export default PokerGame;
