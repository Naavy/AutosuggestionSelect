import { PokemonType } from "../types/Pokemon";

export const selectedPokemonsListReducer = (
  state: PokemonType[],
  action: { type: string, payload: PokemonType }
) => {
  switch (action.type) {
    case "ADD_POKEMON":
      return [...state, action.payload]
    case "DELETE_POKEMON":
      return state.filter(({ name }) => name !== action.payload.name)
    case "CLEAR":
      return []
    default: return state
  }
}