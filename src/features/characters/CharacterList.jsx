import React from 'react';
import CharacterCard from './CharacterCard';
import './characters.css';

const CharacterList = ({ characters, onSelectCharacter, favorites, onToggleFavorite }) => {
  return (
    <section className="character-grid">
      {characters.map((char) => (
        <CharacterCard 
          key={char.id} 
          character={char} 
          onSelectCharacter={onSelectCharacter}
          favorites={favorites} 
          onToggleFavorite={onToggleFavorite} 
        />
      ))}
    </section>
  );
};

export default CharacterList;