import React from 'react';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <Row className={styles.loading}>
      <Spinner animation="grow" />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </Row>
  )
}
