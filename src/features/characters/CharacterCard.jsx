import React from 'react';
import './characters.css';

const CharacterCard = ({ character, onSelectCharacter }) => {
  return (
    <article 
      className="character-card" 
      onClick={() => onSelectCharacter(character)}
      style={{ cursor: 'pointer' }} 
    >
      <img 
        src={character.image} 
        alt={character.name} 
        className="character-image"
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-detail"><strong>Especie:</strong> {character.species}</p>
        <div className="character-detail">
          <span className={`status-badge ${character.status.toLowerCase()}`}>
            {character.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;