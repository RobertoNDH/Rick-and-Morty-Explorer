import React from 'react';
import CharacterCard from './CharacterCard';
import './characters.css';

const CharacterList = ({ characters }) => {
  if (characters.length === 0) {
    return (
      <p className="text-center">No se encontraron habitantes en esta dimensión.</p>
    );
  }

  return (
    <section className="character-grid">
      {characters.map((char) => (
        <CharacterCard key={char.id} character={char} />
      ))}
    </section>
  );
};

export default CharacterList;