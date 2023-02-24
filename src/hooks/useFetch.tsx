import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
        setError(null)
      })
      .catch((error) => {
        setError(error.message)
        setData([])
      })
      .finally(() => {
        setLoading(false)
      });
  }, [])

  return { data, loading, error }
}