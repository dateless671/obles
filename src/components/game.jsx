import React, {useState} from "react";
import { AutoSuggest } from 'react-autosuggestions';
import cities from "../domain/countries.position.json";
import {
  getCompassDirection,
  getDistance,
  getRoughCompassDirection,
} from "geolib";
import geography from "../domain/geography.json";

export const Game = ({ randomItem }) => {
  const [input, setInput] = useState("");
  let [tries, setTries] = useState([]);


const suggestions = cities.map((city) => (city.name))


  const handleKeyPress = (event) =>{
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }
  const handleSubmit = (e) => {

    e.preventDefault();
    setInput("");
    if (input === randomItem.name) {
      alert("You won!");
    } else {
      const long = cities.find((city) => city.name === input).longitude;
      const lat = cities.find((city) => city.name === input).latitude;
      const endLong = randomItem.longitude;
      const endLat = randomItem.latitude;
      const distFrom = getDistance(
        { latitude: lat, longitude: long },
        { latitude: endLat, longitude: endLong }
      );
      const distance = Math.floor(distFrom / 1000) + " km";


      const direction = getCompassDirection(
        { latitude: lat, longitude: long },
        { latitude: endLat, longitude: endLong }
      );
      const arrow = geography[direction]

      const population = cities.find((city) => city.name == input).population
      const populationPercent = Math.floor(population/randomItem.population) + "%"
      setTries((prevTries) => [...prevTries, { input, distance, arrow, populationPercent }]);
    }
  };

  return (
    <div>
      {tries.map(({ input, distance, arrow, populationPercent }) => (
        <h1>
          {input}, {distance}, {arrow}, {populationPercent}
        </h1>
      ))}
      {tries.length === 6 ? (
        <h2>Share</h2>
      ) : (
        <>
        <form onSubmit = {handleSubmit}>
          <AutoSuggest
                options={suggestions}
                value={input} 
                handleChange={setInput} 
                onKeyPress={handleKeyPress} 
                />
          <button>Submit</button>
          </form>
        </>
      )}
    </div>
  );
};
