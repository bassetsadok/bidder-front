import React from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function DeadDatePicker({ setFieldValue, value }) {
  return (
    <div>
      <DateTimePicker
        minDate={new Date()}
        clock={false}
        disableClock={false}
        onChange={value => setFieldValue('deadDate', value)}
        value={value}
      />
    </div>
  );
}
