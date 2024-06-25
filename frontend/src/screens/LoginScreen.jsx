import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/FormContainer.jsx";
import Loader from '../components/Loader.jsx';
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Meta from '../components/Meta.jsx';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();
  const {userInfo} = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';
  useEffect(() => {
    if(userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res, }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.msg || error.error);
    }
  }

  return (
    <FormContainer>
      <Meta title="E-Comm - Login"/>
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(evt) => {
              return setEmail(evt.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(evt) => {
              return setPassword(evt.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Sign in
        </Button>
        
        {isLoading && <Loader/>}
      </Form>
      <Row className="py-3">
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;