// import React, { useState, useEffect } from 'react';
import {Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
// import axios from 'axios';
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Pageinate from '../components/Pageinate.jsx';
import { Link, useParams } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel.jsx';
import Meta from '../components/Meta.jsx';

function mapProduct(product) {
    return (
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Product product={product} />
    </Col>
    ); 
}

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const result = await axios.get('/api/products');
  //     const data = result.data;
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  //redux implementation
  const { pageNumber, keyword } = useParams();
  const {data, isLoading, error} = useGetProductsQuery({ keyword, pageNumber });
  return (
    <>
    <Meta/>
    {!keyword ? <ProductCarousel /> : (<Link to="/" className='btn btn-light mb-4'>Go back</Link>)}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>
          <Message variant="danger">
            { error?.data?.msg || error.error}
          </Message>
        </div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>{data.products.map(mapProduct)}</Row>
          <Pageinate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
