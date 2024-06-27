import React from 'react';
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from '../slices/productsApiSlice';
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

const ProductCarousel = () => {
    const { data : products, isLoading, error } = useGetTopProductsQuery();
    return isLoading ? <Loader /> : error ? <Message variant='danger'>{error.stack}</Message> : (
    <Carousel pause='hover' className='bg-primary mb-4'>
        {products.map(product => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (${product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
    );
}

export default ProductCarousel;