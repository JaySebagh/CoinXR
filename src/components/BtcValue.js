import axios from 'axios';
import React, { useState, useEffect}  from 'react';

const BtcValue = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [current, setCurrent] = useState("currency");

    useEffect(() => {
      const getData = async () => {
        const data = await axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD");
        setData(data.data.data);
        console.log(data.data.data)
      };
  
      getData();
    }, []);

    function convertToCoin(quantity, value) {
      if(!quantity) return 0
      const formula = quantity/value;
      return formula;
    };

    function convertToCurrency(value, quantity) {
      if(!quantity) return 0
      const formula = value*quantity;
      return formula;
    };

    function swap(){
      if(current === "currency"){
        setCurrent("coin")
      } else {
        setCurrent("currency")
      }
    };

    console.log(input);
    return (
        <div>
            <input
              className="valueInput"
              type="number"
              min="0"
              // prevent "e" from being pressed
              onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
              placeholder={current === "currency" ? data.currency : data.base}
              onChange={e => setInput(e.target.value)}
            />
            <p>{current === "currency" ? `${convertToCoin(input, data.amount)} ${data.base}` : `${convertToCurrency(data.amount, input)} ${data.currency}`}</p>
            <button onClick={() => swap()}>swap</button>
            
        </div>
    );
  };

export default BtcValue;