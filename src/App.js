import './components/sass/App.sass';
import BtcValue from './components/BtcValue.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          CoinXR
        </p>
        <BtcValue />
      </header>
    </div>
  );
}

export default App;
