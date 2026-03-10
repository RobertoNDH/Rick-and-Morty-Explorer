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
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rm-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rm-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (showFavoritesOnly) return; 

    const fetchData = async () => {
      setLoading(true);
      const { results, info, error } = await getCharacters(filterName, filterStatus);
      if (error) {
        setCharacters([]);
        setNextPageUrl(null);
        setError(error);
      } else {
        setCharacters(results);
        setNextPageUrl(info.next);
        setError(null);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeoutId);
  }, [filterName, filterStatus, showFavoritesOnly]);

  const toggleFavorite = (character) => {
    setFavorites((prev) => {
      const isFav = prev.some(f => f.id === character.id);
      return isFav ? prev.filter(f => f.id !== character.id) : [...prev, character];
    });
  };

  const handleLoadMore = async () => {
    if (!nextPageUrl || loadingMore) return;
    setLoadingMore(true);
    const { results, info } = await getCharacters('', '', nextPageUrl);
    setCharacters(prev => [...prev, ...results]);
    setNextPageUrl(info.next);
    setLoadingMore(false);
  };

  const dataToShow = showFavoritesOnly ? favorites : characters;

  return (
    <div className="container">
      <header className="text-center">
        <h1 className="main-title">Rick and Morty Explorer</h1>
        <div className="view-controls">
          <button 
            className={`btn-toggle ${!showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(false)}
          >
            Explorar Multiverso
          </button>
          <button 
            className={`btn-toggle ${showFavoritesOnly ? 'active' : ''}`}
            onClick={() => setShowFavoritesOnly(true)}
          >
            Mis Favoritos ({favorites.length})
          </button>
        </div>
      </header>

      <main>
        {!showFavoritesOnly && (
          <CharacterFilters 
            name={filterName} 
            status={filterStatus} 
            onFilterChange={(type, val) => type === 'name' ? setFilterName(val) : setFilterStatus(val)} 
          />
        )}

        <h2 className="section-title">
          {showFavoritesOnly ? 'Tus personajes guardados' : 'Habitantes encontrados'}
        </h2>

        {loading && !showFavoritesOnly ? (
          <div className="text-center loading-state">Teletransportando datos...</div>
        ) : (
          <>
            {dataToShow.length === 0 ? (
              <div className="text-center empty-state">
                <p>{showFavoritesOnly ? 'Aún no tienes favoritos. ¡Añade algunos!' : 'No se encontró a nadie en esta dimensión.'}</p>
              </div>
            ) : (
              <CharacterList 
                characters={dataToShow} 
                onSelectCharacter={setSelectedCharacter}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {nextPageUrl && !showFavoritesOnly && (
              <div className="text-center" style={{ padding: '40px 0' }}>
                <button className="btn-load-more" onClick={handleLoadMore} disabled={loadingMore}>
                  {loadingMore ? 'Cargando...' : 'Cargar más personajes'}
                </button>
              </div>
            )}
          </>
        )}
      </main>

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