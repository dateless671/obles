// import logo from './logo.svg';
import './App.css';
import { Game } from './components/game';
import { getRandomItem } from './components/utils';
import cities from "./domain/countries.position.json";

function App() {
  const item = getRandomItem(cities)
  return (
    <div className="App">
     <img src= {item.img}/>
      <Game
      randomItem = {item}
      />
    </div>
  );
}

export default App;
