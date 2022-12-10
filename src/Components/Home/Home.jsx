import React, { Fragment, useContext, useEffect, useMemo } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import MovieCard from '../../Shared/Components/MovieCard/MovieCard';
import PlaceholderCard from '../../Shared/Components/PlaceholderCard/PlaceholderCard';
import styles from './Home.module.scss';
import { MediaContext } from '../../Shared/Context/MediaStore';

export default function Home() {

  const { fetchMediaList, movieList, tvList, peopleList } = useContext(MediaContext);

  useEffect(() => {
    fetchMediaList('movie');
    fetchMediaList('tv');
    fetchMediaList('person');
  }, [])

  const renderMovieCard = useMemo(
    () => {
      if(movieList) {
        return <MovieCard list={movieList.slice(0,10)}/> 
      }
    }, [movieList])

  const renderTvCard = useMemo(
    () => {
      if(tvList) {
        return <MovieCard list={tvList.slice(0,10)}/> 
      }
    }, [tvList])

  const renderPeopleCard = useMemo(
    () => {
      if(peopleList) {
        return <MovieCard list={peopleList.slice(0,10)}/> 
      }
    }, [peopleList])
  
  return (
    <Fragment>
      <Row className="g-4 my-5">
        <Col xs='6' sm="4" md="3" lg="4">
          <Card className={`${styles.headerContent} px-4`}>
            <Card.Title>Trending <br/> Movies <br/> to watch now</Card.Title>
            <Card.Text>most watched movies by days</Card.Text>
          </Card>
        </Col>
        { movieList ? renderMovieCard : <PlaceholderCard/> }
      </Row>
      <Row className="g-4 my-5">
        <Col xs='6' sm="4" md="3" lg="4">
          <Card className={`${styles.headerContent} px-4`}>
            <Card.Title>Trending <br/> TvShow <br/> to watch now</Card.Title>
            <Card.Text>most watched TvShow by days</Card.Text>
          </Card>
        </Col>
        { tvList ? renderTvCard : <PlaceholderCard/> }
      </Row>
      <Row className="g-4 my-5">
        <Col xs='6' sm="4" md="3" lg="4">
          <Card className={`${styles.headerContent} px-4`}>
            <Card.Title>Trending <br/> Actors  & Actress <br/> to watch now</Card.Title>
            <Card.Text>most watched Actors and  Actress by days</Card.Text>
          </Card>
        </Col>
        { peopleList ? renderPeopleCard : <PlaceholderCard/> }
      </Row>
    </Fragment>
  )
}
