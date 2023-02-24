import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { PokemonType } from '../../types/Pokemon'
import DataRow from '../DataRow/DataRow'
import styles from './AutosuggestionSelect.module.scss'

interface AutosuggestionSelectType {
  dataList: PokemonType[]
  loading: boolean
  error: string | null
  placeholder: string
}

const AutosuggestionSelect = ({ dataList, loading, error, placeholder }: AutosuggestionSelectType) => {
  const [showList, setShowList] = useState(false)
  const [searchedPhrase, setSearchedPhrase] = useState('')
  const [listDisplayed, setListDisplayed] = useState<PokemonType[]>([])
  const [listSelected, setListSelected] = useState<PokemonType[]>([])
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
    setListDisplayed(dataList)
  }, [dataList])

  useEffect(() => {
    if (searchedPhrase === '') {
      setShowList(false)
      setListDisplayed(dataList)
      return
    }
  }, [searchedPhrase])

  const searchedPhraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowList(true)
    setListDisplayed(dataList.filter((data) => data.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setSearchedPhrase(e.target.value)
  }

  const onReset = () => {
    setListSelected([])
  }

  if (loading) return <>Loading....</>

  if (error != null) return <>Something went wrong, reload the page</>

  return (
    <>
      <div className={styles.selectAndCount}>
        <div className={styles.selectWrapper}>
          <div className={styles.select} onClick={() => setShowList(!showList)} ref={selectRef}>
            <input placeholder={`Select ${placeholder}`} onChange={searchedPhraseChange} value={searchedPhrase} />
            <span>▾</span>
          </div>
          {showList &&
            <div className={styles.list}>
              {listDisplayed.map((data: PokemonType) => <div key={data.name}><DataRow data={data} listSelected={listSelected} setListSelected={setListSelected} /></div>)}
            </div>}
        </div>
        <span className={styles.count}>You chose {listSelected.length} {placeholder}s</span>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onReset} className={styles.resetButton}> RESET </button>
      </div>
    </>
  )
}

export default AutosuggestionSelect
