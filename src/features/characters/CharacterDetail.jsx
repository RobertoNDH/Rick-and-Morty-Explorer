import React from 'react';
import './characters.css';

const CharacterDetail = ({ character, onClose }) => {
  const getEpisodeIds = (episodes) => {
    return episodes.map(url => url.split('/').pop()).join(', ');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img src={character.image} alt={character.name} className="modal-image" />
          <div className="modal-title-area">
            <h2>{character.name}</h2>
            <span className={`status-badge ${character.status.toLowerCase()}`}>
              {character.status}
            </span>
          </div>
        </div>

        <div className="modal-body">
          <section>
            <h3>Información Biográfica</h3>
            <p><strong>Especie:</strong> {character.species}</p>
            <p><strong>Género:</strong> {character.gender}</p>
            <p><strong>Origen:</strong> {character.origin.name}</p>
            <p><strong>Localización actual:</strong> {character.location.name}</p>
          </section>

          <section>
            <h3>Apariciones en Episodios</h3>
            <p className="episode-list">
              Aparece en {character.episode.length} episodios (IDs: {getEpisodeIds(character.episode)})
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;