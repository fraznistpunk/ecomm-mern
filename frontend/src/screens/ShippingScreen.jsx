import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from "../components/FormContainer.jsx";
import { saveShippingAddress } from '../slices/cartSlice.js';
import CheckoutSteps from '../components/CheckoutSteps.jsx';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const submitHandler = (evt) => {
    evt.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate("/payment");
  }
  
  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(evt) => setAddress(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(evt) => setCity(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(evt) => setPostalCode(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={country}
            onChange={(evt) => setCountry(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant="primary" className='my-2'>Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
