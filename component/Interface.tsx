export type Card = {
  value: number;
  suit: string;
  rank: string;
};

export enum pokerCombination {
  noHand = 0,
  highCard = 1,
  pair = 2,
  twoPairs = 3,
  threeOfAKind = 4,
  straight = 5,
  flush = 6,
  fullHouse = 7,
  fourOfAKind = 8,
  straightFlush = 9,
  royalFlush = 10
}

export function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}