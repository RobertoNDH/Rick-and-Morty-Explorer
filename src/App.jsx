import React, { useState, useEffect } from 'react';
import { getCharacters } from './services/api';
import CharacterList from './features/characters/CharacterList';
import './assets/index.css'; 

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const { results, error } = await getCharacters();
      
      if (error) {
        setError(error);
      } else {
        setCharacters(results);
      }
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  return (
    <div className="container">
      <header className="text-center">
        <h1 className="main-title">Rick and Morty Explorer</h1>
        <p>Descubre a los habitantes del multiverso</p>
      </header>

      <main>
        {loading && (
          <div className="text-center loading-state">
            <p>Abriendo portal de datos...</p>
          </div>
        )}

        {error && (
          <div className="text-center" style={{ color: 'red' }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <CharacterList characters={characters} />
        )}
      </main>
    </div>
  );
}

export default App;
