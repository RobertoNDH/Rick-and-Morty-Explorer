import React from 'react';
import './characters.css';

const CharacterCard = ({ character, onSelectCharacter, favorites = [], onToggleFavorite }) => {
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(character);
  };

  return (
    <article 
      className="character-card" 
      onClick={() => onSelectCharacter(character)}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-image-container" style={{ position: 'relative' }}>
        <img 
          src={character.image} 
          alt={character.name} 
          className="character-image" 
        />
        <button 
          className={`fav-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label="Toggle Favorite"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-detail">
          <strong>Especie:</strong> {character.species}
        </p>
        <div className="character-status-container">
          <span className={`status-badge ${character.status.toLowerCase()}`}>
            {character.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;