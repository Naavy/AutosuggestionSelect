import { useContext, useEffect, useState } from 'react'
import { PokemonsContext } from '../../context/PokemonsContext'
import AutosuggestionSelect from '../AutosuggestionSelect/AutosuggestionSelect'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const { selectedPokemonsList, dispatchSelectedPokemonsList } = useContext(PokemonsContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0'

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
        setError(null)
      })
      .catch((error) => {
        setError(error.message);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  const onReset = () => {
    dispatchSelectedPokemonsList({
      type: "CLEAR", payload: { name: '', url: '' }
    })
  }

  return (
    <>
      <div className={styles.selectAndCount}>
        <AutosuggestionSelect pokemonList={data} loading={loading} error={error} />
        <span className={styles.count}>You chose {selectedPokemonsList.length} pokemons</span>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onReset} className={styles.resetButton}> RESET </button>
      </div>
    </>
  )
}

export default Dashboard