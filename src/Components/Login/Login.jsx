import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';
import joi from 'joi';
import { AuthContext } from '../../Shared/Context/AuthStore';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {

  const [user, setUser] = useState({email: '', password: ''});

  const [validationErrors, setValidationErrors] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {login, loginResponse} = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [fireFlag, setFireFlag] = useState(null);

  const getFormValue = (e) => {
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  const checkValidation = () => {
    // Reset Prev Error Messages
    setValidationErrors('');
    setEmailError('');
    setPasswordError('');
    // Create Schema
    const schema = joi.object({
      email: joi.string().required().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}),  
      password: joi.string().required().min(3).max(30),
    })
    // Validation Response
    let { error } = schema.validate(user, {abortEarly: false});
    return error;
  }

  const submitForm = (e) => {
    e.preventDefault();
    setServerError('');
    let validationError = checkValidation();
    if(validationError) {
      // Validation Error case
      setValidationErrors(validationError.details);
    }else {
      // success case
      setFireFlag(true);
      login(user);
    }
  }

  useEffect(() => {
    if(validationErrors.length > 0) {
      for(const error of validationErrors) {
        // Email
        if(error.context.key === 'email') {
          if(error.type.includes('pattern')) {
            setEmailError("Please Enter a valid Email");
          }else {
            setEmailError(error.message.replace('"email"','Email'));
          }
        }
        // Password
        else if(error.context.key === 'password') {
          setPasswordError(error.message.replace('"password"','Password'));
        }
      }
    }
  }, [validationErrors])

  useEffect(() => {
    if(loginResponse && fireFlag !== null) {
      if(loginResponse.message === 'success') {
        localStorage.setItem('userToken', loginResponse.token);
        saveUserData();
        navigate('/');
      }else {
        setServerError(loginResponse.message);
      }
      setFireFlag(false);
    }
  }, [loginResponse, fireFlag])

  return (
    localStorage.getItem('userToken') ? <Navigate to="/"/> : 
    <Row className="justify-content-center mt-5 pt-5">
      <Col xs="12" md="8">
        <Card className="bg-transparent border-0">
          <Card.Header className="bg-transparent border-0 text-white">
            <Card.Title>Login Form</Card.Title>
          </Card.Header>
          <Card.Body>
            <form onSubmit={submitForm}>
            {fireFlag !== null && serverError &&
              <Alert variant='danger' className="text-center text-capitalize">{serverError}</Alert>}
              <FloatingLabel label="Email" className="mb-1">
                <Form.Control type="email" name="email" placeholder="Email" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={emailError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{emailError}</Form.Text>
              </Collapse>
              <FloatingLabel label="Password" className="mt-3 mb-1">
                <Form.Control type="password" name="password" placeholder="Password" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={passwordError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{passwordError}</Form.Text>
              </Collapse>
              <Button className="float-end my-4 form-btn" type="submit">
                Login
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
