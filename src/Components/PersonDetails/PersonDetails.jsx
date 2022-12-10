import React, { useContext, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import MovieCard from '../../Shared/Components/MovieCard/MovieCard';
import PlaceholderCard from '../../Shared/Components/PlaceholderCard/PlaceholderCard';
import { useParams } from 'react-router-dom';
import { PersonDetailsContext } from '../../Shared/Context/PersonDetailsStore';

export default function PersonDetails() {

  const { id } = useParams();
  const { fetchDetails, personDetails } = useContext(PersonDetailsContext);

  useEffect(() => {
    fetchDetails(id)
  }, [id])

  const renderMovieCard = useMemo(
    () => <MovieCard list={personDetails}/> 
    ,[personDetails]
  )

  return (
    <Row className="g-4 my-5">
      { personDetails ? renderMovieCard : <PlaceholderCard /> }
    </Row>
  )
}
