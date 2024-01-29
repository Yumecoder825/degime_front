import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const Datetimepicker = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='cursor-pointer p-2'>
      <Datetime value={selectedDate} inputProps={{ placeholder: ' 月 / 日 / 年       --:--' }} onChange={handleDateChange} />
    </div>
  );
};

export default Datetimepicker;