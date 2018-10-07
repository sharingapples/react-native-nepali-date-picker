# react-native-nepali-date-picker

## Usage
This library is the date picker for nepali calendar. To use import the library as

```javascript
import React from 'react';
import NepaliCalendar from 'react-native-nepali-date-picker'

const App = () => (
  <NepaliCalendar
  // defaultDateTimeValue
  value={new Date() }
  // the function to change the current selected date
  onSelect={() => onChange()}
  />);

```

Further more this component can be wrapped within a modal as well to provide functionality such as on cancel click and on submit click. Which basically means to get previously selected value and to change the value. Example:

```javascript

import React from 'react';
import { Modal } from 'react-native';
import NepaliCalendar from 'react-native-nepali-date-picker'

//create a ref to access the nepalicalendar functionality
const nepaliCalendarRef= React.createRef();

const App = () => (
  <Modal
    visible={true}
  >
  <NepaliCalendar
  // defaultDateTimeValue
  value={new Date() }
  // the function to change the current selected date
  onSelect={() => onChange()}
  />);

  <Button
    title="Ok"
    onPress={() => {
      // changes the value of the component
      nepaliCalendarRef.current.onChange();
      // and add a function call to hide modal
    }}
    />

    <Button
      title="Cancel"
      onPress={
        () => {
          // resets to previous value either set or send as default
          nepaliCalendarRef.current.onCancel();
          // add a function call to hide modal
        }
      }
      />
  </Modal>
 ```