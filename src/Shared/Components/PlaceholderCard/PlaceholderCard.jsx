import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

export default function PlaceholderCard() {

  return (
    <Row className="g-4 my-5">
      {Array.from({length: 12}, (item, index) => (
          <Col xs="6" sm="4" md="3" lg="2" key={index}>
            <Placeholder animation="wave" as={Card} style={{height: '250px'}} bg="dark">
              <Placeholder as={Card.Header} className="p-0">
              </Placeholder>
            </Placeholder>
          </Col>
        ))}
    </Row>
  )
}
