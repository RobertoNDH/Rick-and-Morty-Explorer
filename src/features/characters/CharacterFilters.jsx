import React from 'react';
import './characters.css';

const CharacterFilters = ({ name, status, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        name="name"
        placeholder="Buscar por nombre..."
        className="filter-input"
        value={name}
        onChange={handleChange}
      />
      
      <select 
        name="status" 
        className="filter-select" 
        value={status} 
        onChange={handleChange}
      >
        <option value="">Cualquier estado</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>
  );
};

export default CharacterFilters;