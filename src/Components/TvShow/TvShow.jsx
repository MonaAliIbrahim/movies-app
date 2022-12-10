import React, { useContext, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import { MediaContext } from '../../Shared/Context/MediaStore';
import MovieCard from '../../Shared/Components/MovieCard/MovieCard';
import PlaceholderCard from '../../Shared/Components/PlaceholderCard/PlaceholderCard';

export default function TvShow() {

  const { fetchMediaList, tvList } = useContext(MediaContext);

  useEffect(() => {
    fetchMediaList('tv');
  }, [])

  const renderTvShowCard = useMemo(
    () => <MovieCard list={tvList}/> 
    ,[tvList])
  
  return (
    <Row className="g-4 my-5">
      { tvList ? renderTvShowCard : <PlaceholderCard /> }
    </Row>
  )
}
