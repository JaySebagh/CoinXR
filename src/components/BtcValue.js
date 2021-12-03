import axios from 'axios';
import React, { useState, useEffect }  from 'react';

const BtcValue = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
      const getData = async () => {
        const data = await axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD");
        setData(data.data.data);
      };
  
      getData();
    }, []);

    const convert= (quantity, value) => {
        const formula = quantity/value
        return formula
    }

    console.log(input)
    return (
        <div>
            <input
                type="text"
                min="0"
                // prevent "e" from being pressed
                onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
                placeholder={data.currency}
                onChange={e => setInput(e.target.value)}
            />
            <p>{convert(input, data.amount)} {data.base}</p>
        </div>
    );
  };
  

export default BtcValue;