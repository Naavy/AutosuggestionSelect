import { useFetch } from '../../hooks/useFetch'
import AutosuggestionSelect from '../AutosuggestionSelect/AutosuggestionSelect'

const Dashboard = () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0'
  const { data, loading, error } = useFetch(url)

  return (
    <AutosuggestionSelect
      dataList={data}
      loading={loading}
      error={error}
      placeholder={'Pokemon'}
    />
  )
}

export default Dashboard