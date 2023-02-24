import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PokemonType } from '../../types/Pokemon'
import PokemonRow from '../PokemonRow/PokemonRow'
import styles from './AutosuggestionSelect.module.scss'

interface AutosuggestionSelectType {
  pokemonList: PokemonType[]
  loading: boolean
  error: string | null
}

const AutosuggestionSelect = ({ pokemonList, loading, error }: AutosuggestionSelectType) => {
  const [showList, setShowList] = useState(false)
  const [searchedPhrase, setSearchedPhrase] = useState('')
  const [listDisplayed, setListDisplayed] = useState<PokemonType[]>([])
  const selectRef = useRef(null);

  useEffect(() => {
    window.onclick = (event: Event) => {
      const eventTarget = event.target as HTMLElement
      if (eventTarget.contains(selectRef.current) && event.target !== selectRef.current) {
        setShowList(false)
        setSearchedPhrase('')
      }
    }
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowList(false)
    }
  }, [])

  useEffect(() => {
    setListDisplayed(pokemonList)
  }, [pokemonList])

  useEffect(() => {
    if (searchedPhrase === '') {
      setShowList(false)
      setListDisplayed(pokemonList)
      return
    }
  }, [searchedPhrase])

  const searchedPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowList(true)
    setListDisplayed(pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setSearchedPhrase(e.target.value)
  }

  if (loading) return <>Loading....</>
  if (error != null) return <>Something went wrong, reload the page</>
  return (
    <div className={styles.selectWrapper}>
      <div className={styles.select} onClick={() => setShowList(!showList)} ref={selectRef}>
        <input placeholder='Select Pokemon' onChange={searchedPhraseChange} value={searchedPhrase} />
        <span>▾</span>
      </div>
      {showList &&
        <div className={styles.list}>
          {listDisplayed.map((pokemon: PokemonType) => <div key={pokemon.name}><PokemonRow pokemon={pokemon} /></div>)}
        </div>}
    </div>
  )
}

export default AutosuggestionSelect
