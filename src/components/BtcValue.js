import axios from 'axios';
import React, { useState, useEffect }  from 'react';

const BtcValue = () => {
    const [value, setValue] = useState([]);
  
    useEffect(() => {
      const getValue = async () => {
        const value = await axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD");
        setValue(value.data.data);
      };
  
      getValue();
    }, []);
  
    console.log(value)
    return (
        <div>
            <p>1 {value.base} = {value.amount} {value.currency}</p>
        </div>
    );
  };
  

export default BtcValue;