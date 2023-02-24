import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { PokemonType } from '../../types/Pokemon'
import styles from './DataRow.module.scss'

const DataRow = ({ data, listSelected, setListSelected }: { data: PokemonType, listSelected: PokemonType[], setListSelected: Dispatch<SetStateAction<PokemonType[]>> }) => {
  const dataName = data.name.charAt(0).toUpperCase() + data.name.slice(1)
  const dataChecked = listSelected.some(dataSelected => dataSelected.name === data.name)

  const chooseData = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setListSelected([...listSelected, data])
    } else {
      setListSelected(listSelected.filter(({ name }) => name !== data.name))
    }
  }

  const checkData = () => {
    if (dataChecked) {
      setListSelected(listSelected.filter(({ name }) => name !== data.name))
    } else {
      setListSelected([...listSelected, data])
    }
  }

  return (
    <div
      className={styles.dataRow}
      onClick={checkData}
    >
      <input
        type="checkbox"
        onChange={chooseData}
        checked={dataChecked}
      />
      <label
        className={dataChecked ?
          styles['dataName--active'] :
          styles.dataName}
      >
        {dataName}
      </label>
    </div >
  )
}

export default DataRow