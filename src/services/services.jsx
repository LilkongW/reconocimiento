// A (ej. src/services/apiService.js)

// Exportamos la URL base para que esté disponible si se necesita
export const BASE_URL = 'http://192.168.0.100:8000';

/**
 * Llama al endpoint /datos_csv para obtener los datos.
 */

export async function fetchDatosCsv() {
  const url = `${BASE_URL}/datos_csv`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: '' // Cuerpo vacío
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Datos recibidos (fetchDatosCsv):', data);
    return data;

  } catch (error) {
    console.error('Error en fetchDatosCsv:', error);
    return null;
  }
}

// También podrías exportar otras funciones que crees aquí
// export async function otraFuncion() { ... }