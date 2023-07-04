/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';

export const GameSettingsContext = createContext({
  flipSpeed: 0,
  setFlipSpeed(arg: number) {
    arg;
  },
  playerTouchToFlip: false,
  setPlayerTouchToFlip(arg: boolean) {
    !arg;
  },
  jackpotBonus: null,
  setJackpotBonus(arg: string) {
    arg;
  },
});

type GameSettingProps = {children: React.ReactElement};

export const GameSettingProvider = ({children}: GameSettingProps) => {
  const [flipSpeed, setFlipSpeed] = useState<number>(0);
  const [playerTouchToFlip, setPlayerTouchToFlip] = useState<boolean>(true);
  const [jackpotBonus, setJackpotBonus] = useState<string>('crown');

  return (
    <GameSettingsContext.Provider
      value={{
        flipSpeed,
        setFlipSpeed,
        playerTouchToFlip,
        setPlayerTouchToFlip,
        jackpotBonus,
        setJackpotBonus,
      }}>
      {children}
    </GameSettingsContext.Provider>
  );
};
