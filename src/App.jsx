import { useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovie'
import './App.css'

const useSearch = () => {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
  
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

export const App = () => {

  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })
  

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div>
      
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={ handleSubmit }>
          <input onChange={ handleChange } value={ search } name='search' placeholder='Back to the future, The Matrix, John Wick...' />
          <input type="checkbox" onChange={ handleSort } checked={ sort } />
          <button type='submit'>Buscar</button>
        </form>
        { error && <p className='error'>{ error }</p> }
      </header>
      
      <main className='page'>
        {
          loading ? <p>Cargando ...</p> : <Movies movies={ movies } />
        }
      </main>
    </div>
  )
}
