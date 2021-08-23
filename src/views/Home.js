import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const fetchProducts = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/products?limit=4`, {})
      .catch(function (error) {
        console.log(error.response);
        setLoadingProducts(false);
      });

    if (res?.data?.status === 'success') {
      setProducts(res.data.data.docs);
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <Box py="20">
        <Container maxW="container.lg">
          <Heading mb="10">
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '20%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal.200',
                zIndex: -1,
              }}
            >
              Explore The Recent Products
            </Text>
          </Heading>

          <Flex flexWrap="wrap" gridGap="1">
            {loadingProducts ? (
              <Box width="100%" textAlign="center">
                <Spinner size="xl" />
              </Box>
            ) : (
              products.map(product => <ProductCard product={product} />)
            )}
          </Flex>
        </Container>
      </Box>

      <Features />

      <Footer />
    </>
  );
}
