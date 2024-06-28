// import React, {useState, useEffect} from 'react';
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import products from "../products.js"; // fetching from local json file
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from "react-bootstrap";
import Ratings from "../components/Ratings.jsx";
// import axios from 'axios';
//redux implementation
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams(); // prodId from url.
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createReview, { isLoading : loadingProductReview }] = useCreateReviewMutation();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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


  const {userInfo} = useSelector((state) => state.auth);

  // redux
  const {data : product, refetch, isLoading, error} = useGetProductDetailsQuery(productId);
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product, qty
      }));
      navigate('/cart');
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      setComment('');
      toast.success("Review created successfully")
    } catch(err) {
      toast.error(err?.data?.msg || err.error);
    }
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message variant="danger">
            {error?.data?.msg || error.error}
          </Message>
        </div>
      ) : (
        <>
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
        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && (<Message>No reviews</Message>)}
            <ListGroup variant="flush">
              {product.reviews.map((review) => (
                <ListGroupItem key={review._id}>
                  <strong>{review.name}</strong>
                  <Ratings value={review.rating} />
                  <p>{ review.createdAt.substring(0, 10) }</p>
                  <p>{ review.comment }</p>
                </ListGroupItem>
              ))}
              <ListGroup.Item>
                <h2>Write a customer review</h2>
                { loadingProductReview && <Loader /> }
                { userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select ...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="textarea" row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button disabled={loadingProductReview} type="submit" variant="primary">Submit</Button>
                  </Form>
                ) : (
                  <Message>Please <Link to='/login'>Sign in</Link> to write a review</Message>
                ) }
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    )}
  </>
  );
}

export default ProductScreen;
