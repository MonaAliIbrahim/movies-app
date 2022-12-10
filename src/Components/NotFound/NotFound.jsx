import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {

  return (
    <Container>
      <Row className={styles.notFound}>
        <p><span>OOPS</span><br/>404</p>
        <p>Back to <Link to="/">Home</Link></p>
      </Row>
    </Container>
  )
}
