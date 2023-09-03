/* eslint-disable prettier/prettier */
import { Card } from '../component/Interface';

export function checkFlush(cards: Card[], min: number) {

    let counter = 0;

  for (let index = 1; index < cards.length; index++) {
    if (cards[index].suit === cards[index - 1].suit) {
        counter += 1;
    }
    if (counter === min){
        return true;
    }
  }
  return false;
}

export function sortCardValues(cards: Card[]){

    const cardValues = cards.map(x => x.value);

    const sortedCardValues = cardValues.sort(function(a,b) {
      return (+a) - (+b);
    });

    return sortedCardValues;
  }

export function checkStraight(cards: Card[], min: number) {

    const sorted = sortCardValues(cards);

    let counter = 1;

    for (let index = 0; index < sorted.length - 1; index++) {

      if (sorted[index] + 1 === sorted[index + 1]) {
        counter += 1;
      }
      else {
        counter = 0;
      }

      if (counter === min){
        return {straight: true, highest: sorted[sorted.length - 1]};
      }
    }
    return {straight: false, highest: sorted[sorted.length - 1]};
  }
