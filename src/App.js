import './App.css';
import Shortcuts from './components/Shortcuts/Shortcuts';
import TimeDateWeather from './components/TimeDateWeather/TimeDateWeather';

function App() {
  return (
    <div className="App">
      <TimeDateWeather />
      <Shortcuts />
    </div>
  );
}

export default App;
