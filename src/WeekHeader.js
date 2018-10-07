import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  days: Array<String>,
}

const WeekHeader = ({ days }: Props) => days && days.map((d, idx) => (
  // eslint-disable-next-line
  <View key={idx} style={{ width: `${100 / 7} %`, color: '#008D7F', alignItems: 'center' }}>
    <Text> {d} </Text>
  </View>
));

export default WeekHeader;
