import { ChangeEvent, useContext } from 'react'
import { PokemonsContext } from '../../context/PokemonsContext'
import { PokemonType } from '../../types/Pokemon'
import styles from './PokemonRow.module.scss'

const PokemonRow = ({ pokemon }: { pokemon: PokemonType }) => {
  const { selectedPokemonsList, dispatchSelectedPokemonsList } = useContext(PokemonsContext)
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const pokemonChecked = selectedPokemonsList.some(pokemonSelected => pokemonSelected.name === pokemon.name)

  const choosePokemon = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatchSelectedPokemonsList({
        type: "ADD_POKEMON",
        payload: pokemon
      })
    } else {
      dispatchSelectedPokemonsList({
        type: "DELETE_POKEMON",
        payload: pokemon
      })
    }
  }

  const checkPokemon = () => {
    if (pokemonChecked) {
      dispatchSelectedPokemonsList({
        type: "DELETE_POKEMON",
        payload: pokemon
      })
    } else {
      dispatchSelectedPokemonsList({
        type: "ADD_POKEMON",
        payload: pokemon
      })
    }
  }

  return (
    <div
      className={styles.pokemonRow}
      onClick={checkPokemon}
    >
      <input
        type="checkbox"
        onChange={choosePokemon}
        checked={pokemonChecked}
      />
      <label
        className={pokemonChecked ?
          styles['pokemonName--active'] :
          styles.pokemonName}
      >
        {pokemonName}
      </label>
    </div >
  )
}

export default PokemonRow