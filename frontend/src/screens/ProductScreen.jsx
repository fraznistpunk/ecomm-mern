// import React, {useState, useEffect} from 'react';
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import products from "../products.js"; // fetching from local json file
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Ratings from "../components/Ratings.jsx";
// import axios from 'axios';
//redux implementation
import { useGetProductDetailsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams(); // prodId from url.
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  
  // const product = products.find((product) => product._id === productId); // from local json file
  // console.log(product); // from local json file
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const result = await axios.get(`/api/products/${productId}`);
  //     const data = result.data;
  //     setProduct(data);
  //   };
  //   fetchProducts();
  // }, [productId]);

  // redux
  const {data : product, isLoading, isError} = useGetProductDetailsQuery(productId);
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product, qty
      }));
      navigate('/cart');
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        </div>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(event) => {setQty(Number(event.target.value
                        ))}}>
                          {[...Array(product.countInStock).keys()].map((x) =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to cart{" "}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;