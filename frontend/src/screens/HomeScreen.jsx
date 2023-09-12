import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomeScreen = () => {

  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    const {data} = await axios.get('/api/products');
    setProducts(data);
  }
  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <>
        <h1>Latest products</h1>
        <Row>
        {
            products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}></Product>
                </Col>
            ))
        }            
        </Row>
    </>
  )
}

export default HomeScreen