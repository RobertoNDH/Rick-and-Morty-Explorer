import React, { useState, useEffect } from 'react';
import { getCharacters } from './services/api';
import CharacterList from './features/characters/CharacterList';
import CharacterFilters from './features/characters/CharacterFilters';
import CharacterDetail from './features/characters/CharacterDetail';
import './assets/index.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleFilterChange = (type, value) => {
    if (type === 'name') setFilterName(value);
    if (type === 'status') setFilterStatus(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const { results, info, error } = await getCharacters(filterName, filterStatus);
      
      if (error) {
        setCharacters([]);
        setNextPageUrl(null);
        setError(error);
      } else {
        setCharacters(results);
        setNextPageUrl(info.next);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [filterName, filterStatus]);

  const handleLoadMore = async () => {
    if (!nextPageUrl || loadingMore) return;

    setLoadingMore(true);
    const { results, info } = await getCharacters('', '', nextPageUrl);

    if (results.length > 0) {
      setCharacters(prev => [...prev, ...results]);
      setNextPageUrl(info.next);
    }
    setLoadingMore(false);
  };

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
        {}
        {loading && (
          <div className="text-center loading-state">
            <p>Buscando en el multiverso...</p>
          </div>
        )}

        {}
        {!loading && characters.length === 0 && !error && (
          <div className="text-center">
            <p>No se encontraron personajes con esos filtros.</p>
          </div>
        )}

        {}
        {!loading && (
          <>
            <CharacterList 
              characters={characters} 
              onSelectCharacter={setSelectedCharacter} 
            />
            
            {}
            {nextPageUrl && !error && (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <button 
                  className="btn-load-more" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Cargando más...' : 'Cargar más personajes'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {}
      {selectedCharacter && (
        <CharacterDetail 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
    </div>
  );
}

export default App;