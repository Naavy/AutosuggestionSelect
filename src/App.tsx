import Dashboard from './components/Dashboard/Dashboard';
import PokemonsContextProvider from './context/PokemonsContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <PokemonsContextProvider>
        <Dashboard />
      </PokemonsContextProvider>
    </div>
  );
}

export default App;
