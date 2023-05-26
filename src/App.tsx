import {useEffect, useState} from 'react'
import './App.css'

function App() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
    .then(response => response.json()).then(json => setPokemons(json.results));
  }, [])

  return (
    <div className="App">
      <div className="list">
        <ul>
          {pokemons.map((pokemon) => (
            <li>{pokemon.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
