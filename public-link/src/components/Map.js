import React, { useState, useEffect } from 'react';

const Map = ({isClear, onChangeData}) => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    onChangeData({data:e.target.value, type:"map"});
    setLocation(e.target.value);
  };

  useEffect(()=>{
    isClear && setLocation('');
  }, [isClear])
  return (
    <div>
      <input type="text" value={location} onChange={handleLocationChange} className='p-2 border rounded-md' placeholder="所在URLを入力" />
      {location && (
        <div style={{ width: '100%' }} className='aspect-video'>
          <iframe
            title="Google Map"
            width="100%"
            style={{ border: '0' }}
            src={`${location}&output=embed`}
            className='aspect-video'
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default Map;