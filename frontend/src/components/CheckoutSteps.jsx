import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = (props) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {props.step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign in</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;