const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (name = '', status = '', url = null) => {
  try {
    let finalUrl = url;   
    if (!finalUrl) {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (status) params.append('status', status);
      
      const queryString = params.toString();
      const base = 'https://rickandmortyapi.com/api/character';
      finalUrl = queryString ? `${base}/?${queryString}` : base;
    }

    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        return { results: [], info: null, error: 'No se encontraron personajes en esta dimension.' };
      }
      throw new Error('El servidor del multiverso ha fallado.');
    }

    const data = await response.json();
    return { results: data.results, info: data.info, error: null };

  } catch (error) {
    return { 
      results: [], 
      info: null, 
      error: error.message === 'Failed to fetch' 
        ? 'Parece que no tienes conexion a internet.' 
        : error.message 
    };
  }
};