import { useEffect, useState } from 'react'
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [listCountries, setListCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleInputChange = event => {
    const filtered = countries.filter(element => 
      element.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    setListCountries(filtered);
  }

  const handleButtonClick = event => {
    if(buttons.includes(event.target.attributes.id.value)) {
      setButtons(buttons.filter(element => element !== event.target.attributes.id.value));
    } else {
      setButtons(buttons.concat(event.target.attributes.id.value));
    }
  }

  return (
    <div>
      <p>find countries <input onChange={handleInputChange} /> </p>
      <Countries listCountries={listCountries} buttons={buttons} handleButtonClick={handleButtonClick} weather={weather} setWeather={setWeather} />
    </div>
  )
}

export default App;