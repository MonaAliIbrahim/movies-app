import React, { useContext, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import MovieCard from '../../Shared/Components/MovieCard/MovieCard';
import PlaceholderCard from '../../Shared/Components/PlaceholderCard/PlaceholderCard';
import { MediaContext } from '../../Shared/Context/MediaStore';

export default function People() {

  const { fetchMediaList, peopleList } = useContext(MediaContext);

  useEffect(() => {
    fetchMediaList('person');
  }, [])

  const renderPeopleCard = useMemo(
    () => <MovieCard list={peopleList}/> 
    ,[peopleList]
  )
  
  return (
    <Row className="g-4 my-5">
      { peopleList ? renderPeopleCard : <PlaceholderCard /> }
    </Row>
  )
}
