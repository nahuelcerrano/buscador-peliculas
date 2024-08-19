import React from 'react'

const ListOfMovies = ({ movies }) => {
  return (
    <ul className='movies'>
      {
        movies.map( movie => (
          <li className='movie'  key={movie.id}>
            <h3>{ movie.title }</h3>
            <p>{ movie.year }</p>
            <img src={ movie.poster } alt={ movie.Title } />
          </li>
        ))
      }
    </ul>
  )
}

const NoMoviesResult = () => {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

export const Movies = ({ movies }) => {

  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />
  )
}