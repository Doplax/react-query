import { useEffect, useReducer, useState } from 'react';
import './App.css';

// Función asíncrona que obtiene un número aleatorio de una API
const getRandomNumberFromApi = async (): Promise<number> => {
  // Asegúrate de completar la URL correctamente
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain');
  const numberString = await res.text();
  return +numberString; // Convierte el string a número
};

export const App = () => {
  const [number, setNumber] = useState<number>(); // Estado para el número
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para el indicador de carga
  const [error, setError] = useState<string>(); // Estado para el error
  const [key, forceRefetch] = useReducer((x) => x + 1, 0); // Reducer para forzar la recarga

  useEffect(() => {
    setIsLoading(true); // Activa el indicador de carga
    getRandomNumberFromApi()
      .then(setNumber) // Establece el número obtenido
      .catch(error => setError(error.message)) // Captura y establece el error
      .finally(() => setIsLoading(false)); // Desactiva el indicador de carga independientemente del resultado
  }, [key]); // Dependencia: key para reactivar la petición

  return (
    <div className="App App-header">
      {isLoading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h3>Error: {error}</h3> // Muestra el error si existe
      ) : (
        <h2>Número aleatorio: {number}</h2> // Muestra el número si no hay error
      )}
      <button onClick={forceRefetch} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Nuevo número'}
      </button>
    </div>
  );
};
