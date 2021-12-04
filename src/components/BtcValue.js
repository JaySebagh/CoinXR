import axios from 'axios';
import React, { useState, useEffect}  from 'react';

const BtcValue = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    // current conversion (either coin to currency or currency to coin)
    const [current, setCurrent] = useState("currency");

    useEffect(() => {
      // interval to request data every second
      const getData = setInterval(async () => {
        const data = await axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD");
        setData(data.data.data);
      }, 1000);
      return () => clearInterval(getData);
    }, []);

    function convertToCoin(quantity, value) {
      if(!quantity) return 0
      const formula = quantity/value;
      return formula;
    };

    function convertToCurrency(value, quantity) {
      if(!quantity) return 0
      const formula = Math.round(value*quantity*100) / 100;
      return formula;
    };

    function swap(){
      if(current === "currency"){
        setCurrent("coin")
      } else {
        setCurrent("currency")
      }
    };

    return (
        <div>
            <input
              className="valueInput"
              type="number"
              min="0"
              // prevent "e" from being pressed
              onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() }
              placeholder={current === "currency" ? `${data.currency ? data.currency : "loading..."}` : `${data.base? data.base: "loading..."}`}
              onChange={e => setInput(e.target.value)}
            />
            <button onClick={() => swap()}>swap</button>
            <p>{current === "currency" ? `${convertToCoin(input, data.amount)} ${data.base ? data.base : "loading..."}` : `${convertToCurrency(data.amount, input)} ${data.currency ? data.currency : "loading..."}`}</p>
        </div>
    );
  };

export default BtcValue;