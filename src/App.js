import './App.css';
import Clock from './components/Clock/Clock';
import DateWeather from './components/DateWeather/DateWeather';
import Shortcuts from './components/Shortcuts/Shortcuts';

function App() {
  return (
    <div className="App">
      <Clock />
      <DateWeather />
      <Shortcuts />
    </div>
  );
}

export default App;
