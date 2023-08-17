import React, { useState } from 'react';
import './App.css'; 
import skyCleanerLogo from './skyCleanerLogo.png';
//import API from './API';
import axios from 'axios';
import Component1 from './Component1';
import airportMap from './airport'; import './airport.js';


function App() {
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [participants, setParticipants] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function calculateFootprint() {
    const apiKey = '192c3636c896b493df76ee71';
    const apiUrl = 'https://api.goclimate.com/v1/flight_footprint';

    try {
      const originAirportCode = airportMap[originCity.toLowerCase()];
      const destinationAirportCode = airportMap[destinationCity.toLowerCase()];

      if (!originAirportCode || !destinationAirportCode) {
        throw new Error('Airport not found');
      }

      const response = await axios.get(apiUrl, {
        auth: {
          username: apiKey,
          password: ''
        },
        params: {
          'segments[0][origin]': originAirportCode,
          'segments[0][destination]': destinationAirportCode,
          'cabin_class': cabinClass,
          'currencies[]': 'USD'
        }
      });

      displayResult(response.data, participants);
    } catch (error) {
      console.error('airport translation error ', error);
      showErrorBanner();  
    }
  }

  function showErrorBanner() {
    setError('Airport not found');
    setResult(null);;
  }

  function displayResult(data, participants) {
    const totalFootprint = data.footprint * participants;
    setResult(
      <div>
        <div>
          <h2>Result:</h2>
          <p>Ecological footprint per passenger: {data.footprint} kg CO2e</p>
          <p>Total Ecological Footprint per {participants} passengers: {totalFootprint} kg CO2e</p>
        </div>
        <h3>Offset price:</h3>
        <p>{data.offset_prices[0].amount} $</p>
        <a href={data.offset_prices[0].offset_url} target="_blank" rel="noopener noreferrer">Go to offset</a>
      </div>
    );
    setError('');
  }

  function handleDestinationKeyUp(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      calculateFootprint();
    }
  }
  return (
    <div>
      <div className="container-1">
        <div className="title">
          <h1>SKY CLEANER</h1>
          <img src={skyCleanerLogo} width="180px" alt="Sky Cleaner Logo" />
        </div>
        <div className="bird-container bird-container--one">
          <div className="bird bird--one"></div>
        </div>
        <div className="bird-container bird-container--two">
          <div className="bird bird--two"></div>
        </div>
        <div className="bird-container bird-container--three">
          <div className="bird bird--three"></div>
        </div>
        <div className="bird-container bird-container--four">
          <div className="bird bird--four"></div>
        </div>
      </div>
      <div className="container-2">
        <div className="description">
          <h2>what is sky cleaner?</h2>
          <p>
            Welcome to <b>Sky Cleaner</b>, the website that allows you to calculate the <b>CO2 emissions</b> and ecological footprint of your flights with just a <b>few clicks</b>.
          </p>
          <p>
            With Sky Cleaner, you can easily find out the <b>environmental</b> impact of your journey by simply entering the departure and destination airports, <b>without</b> the need for <b>complex calculations</b>.
          </p>
        </div>
        <Component1 />
      </div>
      <div className="container">
        <h2>Calculate the ecological footprint of the flight</h2>
        <div className="input-container">
        <label htmlFor="origin">Departure airport:</label>
      <input
       type="text"
       id="origin"
        placeholder="Es. Rome"
        value={originCity}
         onChange={(e) => setOriginCity(e.target.value)}
         
       />
        </div>
        <div className="input-container">
        <label htmlFor="destination">Destination airport:</label>
      <input
        type="text"
        id="destination"
        placeholder="Es. New York"
        value={destinationCity}
        onChange={(e) => setDestinationCity(e.target.value)}
        onKeyUp={handleDestinationKeyUp}
      />
        </div>
        <div className="input-container">
          <label htmlFor="participants">Passenger:</label>
          <div className="counter">
            <button id="decrementButton" onClick={() => setParticipants(Math.max(participants - 1, 1))}>-</button>
            <input
              type="number"
              id="participants"
              value={participants}
              min="1"
              onChange={(e) => setParticipants(parseInt(e.target.value))}
            />
            <button id="incrementButton" onClick={() => setParticipants(participants + 1)}>+</button>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="cabinClass">Cabin class:</label>
          <select
            id="cabinClass"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
        <button id="calculateButton" onClick={calculateFootprint}>
        Calculate
      </button>
        <div id="result" className="result-container">
          {result && <p>{result}</p>}
        </div>
        <div id="errorBanner" className={`error-banner ${error ? 'visible' : 'hidden'}`}>
         {error && <p>Error: {error}</p>}
        </div>
      </div>
      <footer className="footer">
        <p id="test" className="small-text">
          Copyright: 2022 Luca Scocchi
        </p>
      </footer>
    </div>
  );
}

export default App;