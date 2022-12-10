import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function AppNavbar({userData,logout}) {

  return (
    <Navbar collapseOnSelect expand="lg" className={`${styles.navBar} fixed-top app-nav`}>
      <Container>
        <Navbar.Brand>
          <Link to="">Nuxe</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className={styles.btnToggle}/>
        <Navbar.Collapse id="navbarScroll">
          {userData &&
          <Nav className={`me-auto my-2 my-lg-0 ${styles.nav}`} navbarScroll>
            <Nav.Item>
              <Nav.Link to="" eventKey={1} as={Link}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/movies" eventKey={3} as={Link}>Movies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/tvShow" eventKey={4} as={Link}>TvShow</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="/people" eventKey={2} as={Link}>People</Nav.Link>
            </Nav.Item>
          </Nav>}
          {!userData &&
          <Nav className="ms-auto" navbarScroll>
            <Link className="ms-auto pb-2 me-2 btn custon-btn" to="/login">Login</Link>
            <Link className="ms-auto pb-2 btn custon-btn" to="/register">Register</Link>
          </Nav>}
          {userData &&
          <Button className="ms-auto pb-2 btn custon-btn" onClick={logout}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
