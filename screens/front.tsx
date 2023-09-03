/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Card, pokerCombination, camelCaseToWords} from '../component/Interface';

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

  const counts: Record<string, number> = {};
  for (const card of cards) {
    counts[card.value] = counts[card.value] ? counts[card.value] + 1 : 1;
  }
  return counts;
}


function getKeyByValue(
  object: Record<string, number>,
  value: number,
): number[] {
  const keyResult = Object.keys(object).filter(key => object[key] === value);

  return keyResult ? strArrToIntArr(keyResult) : [];
}

function checkPair(tally: Record<string,number>, cardsLength: number) {

  if (Object.keys(tally).length === cardsLength) {
    return {result: 0, pairValue: getKeyByValue(tally, 2)}; //no pair
  } else if (Object.keys(tally).length === cardsLength - 1) {
    return {result: 1, pairValue: getKeyByValue(tally, 2)}; //p
  } else if (Object.keys(tally).length === cardsLength - 2) {
    if (Object.values(tally).includes(3)) {
      return {result: 3, pairValue: getKeyByValue(tally, 3)}; // 3ok
    }
    return {result: 2, pairValue: getKeyByValue(tally, 2)}; //2p
  } else if (
    Object.keys(tally).length === 2 &&
    Object.values(tally).includes(4)
  ) {
    return {result: 7, pairValue: getKeyByValue(tally, 4)}; //4k
  }
  return {result: 6, pairValue: getKeyByValue(tally, 3)}; //fh
}

/**
 * Sort numbers in array from highest to lowest
 */
function sortCardValues(numberArr: number[]): number[] {

  const sortedCardValues = numberArr.sort(function (a: number, b: number) {
    return +b - +a;
  });

  return sortedCardValues;
}

function checkStraight(
  cardValuesArray: Record<string, number>,
  cards: Card[],
): boolean {
  if (Object.keys(cardValuesArray).length !== cards.length) {
    return false;
  }

  const keysArr: number[] = strArrToIntArr(Object.keys(cardValuesArray));
  const sortedCardValues = sortCardValues(keysArr);

  console.info(sortedCardValues);

  if (cards.length === 3) {
    if (
      sortedCardValues[0] === 14 &&
      sortedCardValues[2] === 2 &&
      sortedCardValues[1] === 3
    ) {
      return true;
    }
  } else if (cards.length === 5) {
    if (
      sortedCardValues[0] === 14 &&
      sortedCardValues[4] === 2 &&
      sortedCardValues[3] === 3 &&
      sortedCardValues[2] === 4 &&
      sortedCardValues[1] === 5
    ) {
      return true;
    }
  }

  for (let index = 0; index < cards.length - 1; index++) {
    if (keysArr[index] - 1 !== keysArr[index + 1]) {
      return false;
    }
  }
  return true;
}

const calculateHand = (
  cards: Card[],
  talliedArr: Record<string, number>,
) => {
  const isFlush: boolean = checkFlush(cards);
  const isStraight = checkStraight(talliedArr, cards);

  // console.log(talliedArr);

  if (isFlush && isStraight && talliedArr[0] === 14) {
    return 10;
  } else if (isFlush && isStraight) {
    return 9;
  } else if (isFlush) {
    return 6;
  } else if (isStraight) {
    return 5;
  } else {
    const checkPairResult = checkPair(talliedArr, cards.length);

    if (checkPairResult.result === 0) {
      const keysArr: number[] = strArrToIntArr(Object.keys(talliedArr));
      const sortedCardValues = sortCardValues(keysArr);
      if (sortedCardValues[0] > 11) {
        return 1;
      }
      return 0;
    } else if (checkPairResult.result === 1) {
      return 2;
    } else if (checkPairResult.result === 3) {
      return 3;
    } else if (checkPairResult.result === 6) {
      return 6;
    } else if (checkPairResult.result === 7) {
      return 7;
    }
    return 2;
  }
};

function strArrToIntArr(array: string[]): number[] {
  const newArray: number[] = [];
  for (let index = 0; index < array.length; index++) {
    let element = parseInt(array[index], 10);
    newArray.push(element);
  }
  return newArray;
}

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

  const [showResult, setShowResult] = useState<boolean>(false);
  const [bonusResult, setBonusResult] = useState<number>(0);
  const [playerBonusSortedHand,setPlayerBonusSortedHand] = useState<Record<string,number>>({});
  const [roundResult, setRoundResult] = useState([]);
  const [anteWin, setAnteWin] = useState<number>(0);
  const [playBetWin, setPlayBetWin] = useState<number>(0);
  const [anteBonusWin, setAnteBonusWin] = useState<number>(0);
  const [pairPlusWin, setPairPlusWin] = useState<number>(0);
  const [bonusWin, setBonusWin] = useState<number>(0);
  const [playerResult, setPlayerResult] = useState<number>(0);
  const [dealerResult, setDealerResult] = useState<number>(0);

  const [playerTalliedResult, setPlayerTalliedResult] = useState<
    Record<string, number>
  >({});
  const [dealerTalliedResult, setDealerTalliedResult] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const originalDeck = generateDeck();
    setFullDeck(originalDeck);
    setDealerResult(0);
    setPlayerResult(0);
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

  function antePayOut(dealerScore: number, playerScore: number): number {
    if (dealerScore === 0){
      return 1;
    }
    else if (dealerScore < playerScore) {
      return 1;
    } else if (dealerScore === playerScore) {
      //if both has pair
      if (dealerScore === 2) {
        const dealerPair: number[] = getKeyByValue(dealerTalliedResult, 2);
        const playerPair: number[] = getKeyByValue(playerTalliedResult, 2);

        if (playerPair[0] > dealerPair[0]) {
          return 1;
        } else if (playerPair === dealerPair) {
          if (
            getKeyByValue(dealerTalliedResult, 1)[0] <
            getKeyByValue(playerTalliedResult, 1)[0]
          ) {
            return 1;
          }
        }
      }
      //if non-pair same score
      const playerKeysArr = strArrToIntArr(Object.keys(playerTalliedResult));
      const dealerKeysArr = strArrToIntArr(Object.keys(dealerTalliedResult));

      for (let index = 0; index < dealerKeysArr.length; index++) {
        if (playerKeysArr[index] > dealerKeysArr[index]) {
          return 1;
        }
      }
    }
    return 0;
  }

  function anteBonusPayOut(playerScore: number): number {
    switch (playerScore){
      case 9:
        return 5;
      case 4:
        return 4;
      case 5:
        return 1;
      default:
        return 0;
    }
  }

  function pairPlusPayOut(playerScore: number): number {
    switch (playerScore){
      case 9:
        return 40;
      case 3:
        return 30;
      case 5:
        return 6;
      case 6:
        return 4;
      case 2:
        return 1;
      default:
        return 0;
    }
  }

  function bonusPayOut(bonusScore: number): number {
    switch (bonusScore){
      case 10:
        return 100000;
      case 9:
        return 10000;
      case 8:
        return 1000;
      case 7:
        return 100;
      case 6:
        return 60;
      case 5:
        return 40;
      case 4:
        return 10;
      case 3:
        return 2;
      default:
        return 0;
    }
  }

  function playerPlay() {
    const dealerScore: number = (calculateHand(dealerHand, dealerTalliedResult));
    const playerScore: number = (calculateHand(playerHand, playerTalliedResult));

    const playerBonusHand: Card[] = playerHand.concat(jackpotHand);
    const talliedBonus = tallyCards(playerBonusHand);
    const bonusScore:number = calculateHand(playerBonusHand ,talliedBonus);
    setPlayerResult(playerScore);
    setDealerResult(dealerScore);
    setBonusResult(bonusScore);

    const antePayOutResult: number = antePayOut(dealerScore, playerScore);
    const playBetResult: number = (dealerScore > 0 && antePayOutResult > 0) ? 1 : 0;
    setAnteWin(antePayOutResult);
    setPlayBetWin(playBetResult);
    setAnteBonusWin(anteBonusPayOut(playerScore));
    setPairPlusWin(pairPlusPayOut(playerScore));
    setBonusWin(bonusPayOut(bonusScore));

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
      setShowResult(true);
    }, 2000);
  }

  const dealCards = () => {
    const shuffledDeck = shuffleDeck(fullDeck);

    const shuffledDeck3 = [
      {rank: 'J', suit: '♦', value: 11},
      {rank: 'Q', suit: '♦', value: 12},
      {rank: 'K', suit: '♦', value: 13},
      {rank: 'Q', suit: '♠', value: 12},
      {rank: 'J', suit: '♠', value: 11},
      {rank: '2', suit: '♦', value: 2},
      {rank: '10', suit: '♦', value: 10},
      {rank: 'A', suit: '♦', value: 14},
      {rank: '3', suit: '♥', value:3},
      {rank: '3', suit: '♣', value:3},
    ];
    flipCard(9);
    setShowResult(false);

    //for front end display purposes only
    setPlayerHand(shuffledDeck.slice(0, 3));
    setDealerHand(shuffledDeck.slice(3, 6));
    setJackpotHand(shuffledDeck.slice(6, 8));

    //const sortedPlayerCard: number[] = sortCardValues(shuffledDeck.slice(0, 3));
    //const sortedDealerCard: number[] = sortCardValues(shuffledDeck.slice(3, 6));

    setPlayerTalliedResult(tallyCards(shuffledDeck.slice(0, 3)));
    setDealerTalliedResult(tallyCards(shuffledDeck.slice(3, 6)));
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
              {showResult
                ? camelCaseToWords(pokerCombination[dealerResult])
                : null}
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
              {showResult
                ? camelCaseToWords(pokerCombination[playerResult])
                : null}
            </Text>
          </View>
        )}
        {showResult && (
          <View>
            <Text>ante: x{anteWin}  bonus: x{bonusWin}</Text>
            <Text>anteBonus: x{anteBonusWin} </Text>
            <Text>play: x{playBetWin}</Text>
            <Text>pairPlus: x{pairPlusWin}</Text>
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
          <TouchableOpacity style={styles.button2} onPress={() => playerPlay()}>
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
  },
});

export default PokerGame;
