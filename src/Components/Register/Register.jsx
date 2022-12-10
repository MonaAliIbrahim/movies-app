import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import joi from 'joi';
import { AuthContext } from '../../Shared/Context/AuthStore';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  const [user, setUser] = useState({
    first_name: '', 
    last_name: 'a', 
    email: '', 
    phone: '', 
    password: '', 
    repeat_password: '',
    age: 20, 
  });

  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fireFlag, setFireFlag] = useState(null);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRepasswordError] = useState('');

  const {signup, signupResponse} = useContext(AuthContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const getFormValue = (e) => {
    let currentUser = {...user};
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  }

  const checkValidation = () => {
    // Reset Prev Error Messages
    setValidationErrors('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setRepasswordError('');
    // Create Schema
    const schema = joi.object({
      first_name: joi.string().required().pattern(/^[a-zA-Z ]{2,}$/), 
      last_name: joi.string(), 
      email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), 
      phone: joi.string().required().pattern(/^01[0125][0-9]{8}$/), 
      password: joi.string().required().min(3).max(30),
      repeat_password: joi.ref('password'),
      age: joi.number(), 
    })
    // Validation Response
    let { error } = schema.validate(user, {abortEarly: false});
    return error;
  }

  const submitForm = (e) => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);
    let validationError = checkValidation();
    if(validationError) {
      // Validation Error case
      setValidationErrors(validationError.details);
      setIsLoading(false);
    }else {
      // Validation Success case
      setFireFlag(true);
      signup(user);
    }
  }

  useEffect(() => {
    if(validationErrors.length > 0) {
      for(const error of validationErrors) {
        // Name
        if(error.context.key === 'first_name') {
          if(error.type.includes('pattern')) {
            setNameError("Name must at least 2 Characters of letters only");
          }else {
            setNameError(error.message.replace('"first_name"', 'Name'));
          }
        }
        // Email
        else if(error.context.key === 'email') {
          if(error.type.includes('pattern')) {
            setEmailError("Please Enter a valid Email");
          }else {
            setEmailError(error.message.replace('"email"','Email'));
          }
        }
        // Phone
        else if(error.context.key === 'phone') {
          if(error.type.includes('pattern')) {
            setPhoneError("Please Enter a valid Phone Number");
          }else {
            setPhoneError(error.message.replace('"phone"','Phone'));
          }
        }
        // Password
        else if(error.context.key === 'password') {
          setPasswordError(error.message.replace('"password"','Password'));
        }
        // Repassword
        else if(error.context.key === 'repeat_password') {
          setRepasswordError('Password and Re-Password Fields must be matched');
        }
      }
    }
  }, [validationErrors])

  useEffect(() => {
    setIsLoading(false);
    if(signupResponse && fireFlag !== null) {
      if(signupResponse.message === 'success') {
        navigate('/login');
      }else {
        setServerError(signupResponse.message);
      }
      setFireFlag(false);
    }
  }, [signupResponse, fireFlag, navigate])

  return (
    <Row className="justify-content-center mt-4 pt-4">
      <Col xs="12" md="8">
        <Card className="bg-transparent border-0">
          <Card.Header className="bg-transparent border-0 text-white">
            <Card.Title>Registeration Form</Card.Title>
          </Card.Header>
          <Card.Body>
            <form onSubmit={submitForm}>
              {fireFlag !== null && serverError &&
              <Alert variant='danger' className="text-center text-capitalize">{serverError}</Alert>}
              <FloatingLabel label="Name" className="mb-1">
                <Form.Control type="text" name="first_name" placeholder="Name" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={nameError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{nameError}</Form.Text>
              </Collapse>
              <FloatingLabel label="Email" className="mt-3 mb-1">
                <Form.Control type="email" name="email" placeholder="Email" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={emailError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{emailError}</Form.Text>
              </Collapse>
              <FloatingLabel label="Phone Number" className="mt-3 mb-1">
                <Form.Control type="tel" name="phone" placeholder="Phone Number" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={phoneError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{phoneError}</Form.Text>
              </Collapse>
              <FloatingLabel label="Password" className="mt-3 mb-1">
                <Form.Control type="password" name="password" placeholder="Password" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={passwordError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{passwordError}</Form.Text>
              </Collapse>
              <FloatingLabel label="Re-Password" className="mt-3 mb-1">
                <Form.Control type="password" name="repeat_password" placeholder="Re-Password" onChange={getFormValue}/>
              </FloatingLabel>
              <Collapse in={rePasswordError.length > 0 ? true: false}>
                <Form.Text className="text-danger">{rePasswordError}</Form.Text>
              </Collapse>
              <Button className="float-end my-4 form-btn" type="submit">
                {isLoading ? <>
                  <Spinner animation="grow" size="sm" className="mx-1"/>
                  <Spinner animation="grow" size="sm" className="me-1"/>
                </> : 'Register'}
              </Button>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
