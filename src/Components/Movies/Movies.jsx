import React, { useContext, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import { MediaContext } from '../../Shared/Context/MediaStore';
import MovieCard from '../../Shared/Components/MovieCard/MovieCard';
import PlaceholderCard from '../../Shared/Components/PlaceholderCard/PlaceholderCard';

export default function Movies() {

  const { fetchMediaList, movieList } = useContext(MediaContext);

  useEffect(() => {
    fetchMediaList('movie');
  }, [])

  const renderMovieCard = useMemo(
    () => <MovieCard list={movieList}/> 
    ,[movieList]
  )
  
  return (
    <Row className="g-4 my-5">
      { movieList ? renderMovieCard : <PlaceholderCard /> }
    </Row>
  )
}
