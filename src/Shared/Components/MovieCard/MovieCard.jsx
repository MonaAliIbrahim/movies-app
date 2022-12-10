import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import styles from './MovieCard.module.scss';

export default function MovieCard({list}) {

  return (
    list.map((item, index) => (
      <Col xs="6" sm="4" md="3" lg="2" key={index}>
        <Card className={styles.movieCard}>
          <Card.Header className="p-0">
            {item.poster_path ? 
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}/> :
              item.profile_path ?
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}/> :
              <Card.Img variant="top" src={require('../../../Assets/Images/placeholder.png')} height="100%"/>}
          </Card.Header>
          <Card.Body className="px-0 text-center">
            <Card.Title className={styles.title}>
              {item.media_type === 'person' ? 
                <Link to={`/people/${item.id}`} className="stretched-link">
                  {item.title}{item.name}
                </Link>
              : <Link to={`/${item.media_type}/${item.id}`} className="stretched-link">
                  {item.title}{item.name}
                </Link>}
            </Card.Title>
            {item.vote_average &&               
              <Card.Text>
                <span>{item.vote_average.toFixed(1)}</span>
              </Card.Text>}
          </Card.Body>
        </Card>
      </Col>
    ))
  )
}
