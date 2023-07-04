/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

export const PayoutSettingsContext = createContext({
  ppPair: 0,
  setPpPair() {null;},
  ppFlush: 0,
  setPpFlush() {null;},
  ppStraight: 0,
  setPpStraight() {null;},
  pp3OfAKind: 0,
  setPp3OfAKind() {null;},
  ppStraightFlush: 0,
  setPpStraightFlush() {null;},
  ppMiniRoyal: 0,
  setPpMiniRoyal() {null;},
  bonusTwoPair: 0,
  setBonusTwoPair() {null;},
  bonus3OfAKind: 0,
  setBonus3OfAKind() {null;},
  bonusStraight: 0,
  setBonusStraight() {null;},
  bonusFlush: 0,
  setBonusFlush() {null;},
  bonusFullHouse: 0,
  setBonusFullHouse() {null;},
  bonus4OfAKind: 0,
  setBonus4OfAKind() {null;},
  bonusStraightFlush: 0,
  setBonusStraightFlush() {null;},
  bonusRoyalFlush: 0,
  setBonusRoyalFlush() {null;},
});

type PayoutSettingProps = {children: React.ReactElement};

export const GameSettingProvider = ({children}: PayoutSettingProps) => {
  const [ppPair, setPpPair] = useState<number>(1);
  const [ppFlush, setPpFlush] = useState<number>(4);
  const [ppStraight, setPpStraight] = useState<number>(6);
  const [pp3OfAKind, setPp3OfAKind] = useState<number>(30);
  const [ppStraightFlush, setPpStraightFlush] = useState<number>(40);
  const [ppMiniRoyal, setPpMiniRoyal] = useState<number>(50);
  const [bonusTwoPair, setBonusTwoPair] = useState<number>(1);
  const [bonus3OfAKind, setBonus3OfAKind] = useState<number>(5);
  const [bonusStraight, setBonusStraight] = useState<number>(10);
  const [bonusFlush, setBonusFlush] = useState<number>(20);
  const [bonusFullHouse, setBonusFullHouse] = useState<number>(25);
  const [bonus4OfAKind, setBonus4OfAKind] = useState<number>(50);
  const [bonusStraightFlush, setBonusStraightFlush] = useState<number>(200);
  const [bonusRoyalFlush, setBonusRoyalFlush] = useState<number>(1000);

  return (
    <PayoutSettingsContext.Provider
      value={{
        ppPair,
        setPpPair,
        ppFlush,
        setPpFlush,
        ppStraight,
        setPpStraight,
        pp3OfAKind,
        setPp3OfAKind,
        ppStraightFlush,
        setPpStraightFlush,
        ppMiniRoyal,
        setPpMiniRoyal,
        bonusTwoPair,
        setBonusTwoPair,
        bonus3OfAKind,
        setBonus3OfAKind,
        bonusStraight,
        setBonusStraight,
        bonusFlush,
        setBonusFlush,
        bonusFullHouse,
        setBonusFullHouse,
        bonus4OfAKind,
        setBonus4OfAKind,
        bonusStraightFlush,
        setBonusStraightFlush,
        bonusRoyalFlush,
        setBonusRoyalFlush,
      }}>
      {children}
    </PayoutSettingsContext.Provider>
  );
};
