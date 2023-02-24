import { Dispatch } from "react"
import { PokemonType } from "./Pokemon"

export type PokemonsContextType = {
  selectedPokemonsList: PokemonType[]
  dispatchSelectedPokemonsList: Dispatch<{ type: string, payload: PokemonType }>
}