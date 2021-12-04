import axios from 'axios';
import React, { useState, useEffect }  from 'react';
// import CoinToCurrency from './CoinToCurrency';
// import CurrencyToCoin from './CurrencyToCoin';

const BtcValue = () => {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [current, setCurrent] = useState("currency");

    useEffect(() => {
      const getData = async () => {
        const data = await axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD");
        setData(data.data.data);
      };
  
      getData();
    }, []);

    function convert(quantity, value) {
        const formula = quantity/value;
        return formula;
    };

    function swap(){
      if(current === "currency"){
        setCurrent("coin")
        document.getElementsByClassName('valueInput')[0].placeholder=`${data.base}`
        document.getElementsByClassName('convertionText')[0].innerText=`${convert(input, data.amount)} ${data.currency}`
      } else {
        setCurrent("currency")
        document.getElementsByClassName('valueInput')[0].placeholder=`${data.currency}`
        document.getElementsByClassName('convertionText')[0].innerText=`${convert(input, data.amount)} ${data.base}`
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
                placeholder={data.currency}
                onChange={e => setInput(e.target.value)}
            />
            <p className="convertionText">{convert(input, data.amount)} {data.base}</p>
            <button onClick={() => swap()}>swap</button>
            
        </div>
    );
  };
  

export default BtcValue;