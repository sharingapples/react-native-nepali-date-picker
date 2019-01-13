import React, { Component } from 'react';
import {
  View, Button, Text, Modal,
} from 'react-native';
import CalendarInput from './CalendarInput';

const Calendar = ({ onChange, onCancel }) => (
  <View
    style={{
      position: 'absolute',
    }}
  >
    <Modal
      animationType="slide"
      transparent
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
        }}
      >
        <CalendarInput onChange={onChange} onCancel={onCancel} />
      </View>
    </Modal>
  </View>
);

export default Calendar;
