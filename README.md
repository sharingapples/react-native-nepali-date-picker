# react-native-nepali-date-picker

## Usage
This library is the date picker for nepali calendar. To use import the library as

```javascript
import React from 'react';
import Calendar from 'react-native-nepali-date-picker'

const App = () => (
  <Calendar
  // defaultDateTimeValue
  value={new Date()} // default value
  visibility={true} // set the visibilty of the component
  onSelect={v => console.log(v)} // on each select by the user to a certain date
  onCancel={v => console.log(v)} // on press cancel thought not required
   //as user can handle is still can be useful as it gives you back the value you pass to it
  onChange={v => console.log(v)} // on press ok
  />);

```

The resulting value v for each function call back has property as:

  1) getYear(): gives year in number
  2) getMonth(): gives Month in number
  3) getDate(): gives the date in number

## Output

![simulator screen shot - iphone x - 2018-10-29 at 16 09 56](https://user-images.githubusercontent.com/12614476/47644129-72f3f200-db95-11e8-95d7-2ddbcbdf9032.png)
