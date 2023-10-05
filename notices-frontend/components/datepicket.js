import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

const MyDatePicker = ({onDateReceived}) => {

  const [date, setDate] = useState(new Date("2016-05-15"));

  // Function to handle button press and send data to parent
  const sendDataToParent = () => {
    onDateReceived(date); // Call the callback function and pass the data
    setDate(''); // Clear the input after sending data
  }
  return (
    <DatePicker
      style={{ width: 200 }}
      date={date}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate={new Date("2016-05-01")}
      maxDate={new Date("2016-06-01")}
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(selectedDate) => {
        sendDataToParent(selectedDate);
      }}
    />
  );
};

export default MyDatePicker;
