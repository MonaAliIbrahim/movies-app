import React, { useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Loading from '../../Shared/Components/Loading/Loading';
import { useParams, Link } from 'react-router-dom';
import { DetailsContext } from '../../Shared/Context/MediaDetailsStore';
import styles from './MediaDetails.module.scss';

export default function Details() {

  const { type, id } = useParams();
  const { fetchDetails, detailsObj } = useContext(DetailsContext);

  useEffect(() => {
    fetchDetails(type, id);
  }, [])

  return (
    !detailsObj ? <Loading/> :
    <Row className="my-5 align-items-center">
      <Col xs="12" md="5" className="mt-0 mt-md-5">
        <Image className="w-100" alt="Movie Poster" rounded
          src={`https://image.tmdb.org/t/p/original/${detailsObj.backdrop_path}`} />
        <div className="d-grid my-4">
          <a href={detailsObj.homepage} 
            target="_blank" 
            className="custon-btn btn" 
            rel="noreferrer">Watch it</a>
        </div>
      </Col>
      <Col xs="12" md="7">
        <Card className={`${styles.contentCard} border-0`}>
          <Card.Body>
            <Card.Title className={`${styles.title} mb-3`}>
              {detailsObj.title} {detailsObj.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {detailsObj.tagline}
            </Card.Subtitle>
            {detailsObj.genres.map((genre) => (
              <Link to='' key={genre.id}>
                <Badge className="me-3 mt-2">{genre.name}</Badge>
              </Link>))}
            <ListGroup className="my-2">
              <ListGroup.Item className="px-0 border-0 bg-transparent text-white">
                Vote : {detailsObj.vote_average}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 border-0 bg-transparent text-white">
                Vote count: {detailsObj.vote_count}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 border-0 bg-transparent text-white">
                Popularity: {detailsObj.popularity}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 border-0 bg-transparent text-white">
                Release date: {detailsObj.release_date} {detailsObj.first_air_date}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 border-0 bg-transparent text-white">
                Status: {detailsObj.status}
              </ListGroup.Item>
            </ListGroup>
            <Card.Text>
              {detailsObj.overview}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
