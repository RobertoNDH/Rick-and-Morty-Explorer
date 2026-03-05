const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (name = '', status = '') => {
  try {
    const query = new URLSearchParams();
    if (name) query.append('name', name);
    if (status) query.append('status', status);

    const queryString = query.toString();
    const url = queryString ? `${BASE_URL}/?${queryString}` : BASE_URL;

    const response = await fetch(url);
    
    if (!response.ok) {
      return { results: [], error: 'No se encontraron personajes' };
    }

    const data = await response.json();
    return { results: data.results, error: null };
  } catch (error) {
    return { results: [], error: 'Error de conexión con el multiverso' };
  }
};