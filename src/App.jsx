import React, { useState, useEffect } from 'react';
import { getCharacters } from './services/api';
import CharacterList from './features/characters/CharacterList';
import CharacterFilters from './features/characters/CharacterFilters';
import './assets/index.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleFilterChange = (type, value) => {
    if (type === 'name') setFilterName(value);
    if (type === 'status') setFilterStatus(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { results, error } = await getCharacters(filterName, filterStatus);
      
      if (error) {
        setCharacters([]);
        setError(error);
      } else {
        setCharacters(results);
        setError(null);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);

  }, [filterName, filterStatus]); 

  return (
    <div className="container">
      <header className="text-center">
        <h1 className="main-title">Rick and Morty Explorer</h1>
      </header>

      <CharacterFilters 
        name={filterName} 
        status={filterStatus} 
        onFilterChange={handleFilterChange} 
      />

      <main>
        {loading && <div className="text-center loading-state">Buscando en el multiverso...</div>}
        {!loading && (
          <CharacterList characters={characters} />
        )}
      </main>
    </div>
  );
}

export default App;
