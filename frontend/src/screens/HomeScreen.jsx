// import React, { useState, useEffect } from 'react';
import {Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
// import axios from 'axios';
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Pageinate from '../components/Pageinate.jsx';
import { useParams } from 'react-router-dom';

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
  const { pageNumber } = useParams();
  const {data, isLoading, isError} = useGetProductsQuery({ pageNumber });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="danger">
            { isError?.data?.message || isError.error}
          </Message>
        </div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>{data.products.map(mapProduct)}</Row>
          <Pageinate pages={data.pages} page={data.page} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
