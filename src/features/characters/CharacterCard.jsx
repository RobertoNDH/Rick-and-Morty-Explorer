import React from 'react';
import './characters.css'; 

const CharacterCard = ({ character }) => {
  return (
    <article className="character-card">
      <img 
        src={character.image} 
        alt={character.name} 
        className="character-image"
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-detail">
          <strong>Especie:</strong> {character.species}
        </p>
        <p className="character-detail">
          <strong>Origen:</strong> {character.origin.name}
        </p>
        <div className="character-detail">
          <span className="status-badge">
            {character.status}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CharacterCard;