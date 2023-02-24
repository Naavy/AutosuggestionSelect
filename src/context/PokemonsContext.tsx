import { createContext, useEffect, useReducer } from "react";
import { selectedPokemonsListReducer } from "../reducers/selectedPokemonsList";
import { PokemonsContextType } from "../types/PokemonsContext";

export const PokemonsContext = createContext<PokemonsContextType>({ selectedPokemonsList: [], dispatchSelectedPokemonsList: () => { } })

const PokemonsContextProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [selectedPokemonsList, dispatchSelectedPokemonsList] = useReducer(selectedPokemonsListReducer, {}, () => {
    const localData = localStorage.getItem("selectedPokemonsList")
    return localData ? JSON.parse(localData) : []
  })

  useEffect(() => {
    localStorage.setItem("selectedPokemonsList", JSON.stringify(selectedPokemonsList))
  }, [selectedPokemonsList])

  return (
    <PokemonsContext.Provider value={{ selectedPokemonsList, dispatchSelectedPokemonsList }}>
      {children}
    </PokemonsContext.Provider>
  )
}

export default PokemonsContextProvider