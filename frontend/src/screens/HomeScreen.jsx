import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductsCarousel from '../components/ProductsCarousel';

const HomeScreen = () => {
    const { keyword, pageNumber } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });
    return (
        <>
        { !keyword ? <ProductsCarousel /> : <Link to='/' className='btn btn-light mb-4'>Go Back</Link> }
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error?.error}
                </Message>
            ) : (
                <>
                    <h1>Latest products</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={data.page} pages={data.pages} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
