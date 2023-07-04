/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {Checkboxes} from '../component/Checkbox';
import {
  GameSettingProvider,
  GameSettingsContext,
} from '../global/context/GameSettings';
import {PayoutSettingsContext} from '../global/context/PayoutSettings';

export function Settings() {
  const gameSetting = useContext(GameSettingsContext);
  const payoutSetting = useContext(PayoutSettingsContext);
  return (
    <View>
      <View>
        <Text>Settings</Text>
      </View>
      <View>
        <Text>Game Mode Settings</Text>
        <TouchableWithoutFeedback
        onPress={() => gameSetting.setPlayerTouchToFlip(!gameSetting.playerTouchToFlip)}>
          <View>
            <Checkboxes isTicked={gameSetting.playerTouchToFlip} label={'Touch cards to flip'} />
          </View>
        </TouchableWithoutFeedback>
        <Text>Game Mode Settings</Text>
        <TouchableWithoutFeedback
        onPress={() => gameSetting.setPlayerTouchToFlip(!gameSetting.playerTouchToFlip)}>
          <View>
            <Checkboxes isTicked={gameSetting.playerTouchToFlip} label={'Touch cards to flip'} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
