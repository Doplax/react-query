import './App.css';
import { useRandom } from './hooks/useRandom';


export const App = () => {

  const query = useRandom();

  return (
    <div className="App App-header">
      {query.isLoading
        ? (<h2>Cargando...</h2>)
        : (<h2>Número aleatorio: {query.data}</h2>)
      }
      <button onClick={() => query.refetch()} disabled={query.isFetched}>
        {query.isLoading ? 'Cargando...' : 'Nuevo número'}
      </button>
    </div>
  );
};
