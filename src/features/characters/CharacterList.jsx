import React from 'react';
import CharacterCard from './CharacterCard';
import './characters.css';

const CharacterList = ({ characters, onSelectCharacter }) => {
  if (characters.length === 0) {
    return <p className="text-center">No se encontraron habitantes.</p>;
  }

  return (
    <section className="character-grid">
      {characters.map((char) => (
        <CharacterCard 
          key={char.id} 
          character={char} 
          onSelectCharacter={onSelectCharacter} 
        />
      ))}
    </section>
  );
};

export default CharacterList;