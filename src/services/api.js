const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (name = '', status = '', url = null) => {
  try {
    let finalUrl = url;

    if (!finalUrl) {
      const query = new URLSearchParams();
      if (name) query.append('name', name);
      if (status) query.append('status', status);
      
      const queryString = query.toString();
      finalUrl = queryString ? `https://rickandmortyapi.com/api/character/?${queryString}` : 'https://rickandmortyapi.com/api/character';
    }

    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      return { results: [], info: null, error: 'No hay más dimensiones que explorar' };
    }

    const data = await response.json();
    return { 
      results: data.results, 
      info: data.info, 
      error: null 
    };
  } catch (error) {
    return { results: [], info: null, error: 'Error de conexión' };
  }
};