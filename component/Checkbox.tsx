/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export function Checkboxes({isTicked, label}:{isTicked: boolean, label: string}) {
  return (
    <View style={styles.div}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.tick}>{isTicked ? '✓' : ''}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  div: {flexDirection: 'row', margin: 1},
  box: {backgroundColor: 'white', height: 20, width: 20},
  tick: {color: 'green', textAlign: 'center'},
  label: {marginRight: 10},
  labelText: {color: 'white'},
});
