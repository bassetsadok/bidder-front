import React, { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/layout';
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCash,
  HiOutlineTicket,
  HiOutlineViewGrid,
  HiSearch,
  HiShoppingBag,
} from 'react-icons/hi';
import { CgLayoutGrid, CgLayoutList } from 'react-icons/cg';
import {
  Button,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
} from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductCardH from '../components/ProductCardH';

export default function Products() {
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const handleChange = value => setValue(value);

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [category, setCategory] = React.useState('');
  const [tags, setTags] = useState([]);

  const [isGrid, setIsGrid] = useState(false);
  const LIMIT = 2;
  const fetchProducts = async (currentPage = 1, sort = 'name') => {
    setLoadingProducts(true);

    const res = await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/v1/products/?closed=false&limit=${LIMIT}&page=${currentPage}&currentPrice[lte]=${
          value === 0 ? '1000000' : value
        }${category ? `&category=${category}` : ''}&sort=${sort}&q=${search}`
      )
      .catch(function (error) {
        console.log(error.response);
        setLoadingProducts(false);
      });
    if (res?.data?.status === 'success') {
      setProducts(res.data.data.docs);
      setLoadingProducts(false);
    }
  };
  const fetchProductsCount = async () => {
    setLoadingProducts(true);
    const res = await axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }/api/v1/products/?closed=false&limit&currentPrice[lte]=${
          value === 0 ? '1000000' : value
        }${category ? `&category=${category}` : ''}&q=${search}`
      )
      .catch(function (error) {
        console.log(error.response);
      });

    if (res?.data?.status === 'success') {
      setPageCount(res.data.results);
    }
  };
  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );

    setTags(res?.data?.data?.docs);
  };
  useEffect(() => {
    fetchProducts();
    fetchProductsCount();
    fetchTags();
  }, []);
  return (
    <>
      <Navbar />
      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" fontWeight="medium" display="flex">
            <HiShoppingBag /> All the products
          </Heading>
        </Container>
      </Box>

      <Box as="section" my="3rem">
        <Container maxW="container.lg">
          <Flex align="flex-start" wrap="wrap" justify="space-between">
            <Box
              mb="1rem"
              bg="gray.100"
              rounded="lg"
              p="2rem"
              width={['100%', '100%', '100%', '28%']}
            >
              <Heading mb="2rem" display="flex" size="md" fontWeight="semibold">
                <HiOutlineViewGrid /> <Text ml=".7rem">Filter</Text>
              </Heading>
              <Heading mb=".7rem" display="flex" size="sm" fontWeight="medium">
                <HiSearch />{' '}
                <Text fontWeight="semibold" ml=".7rem">
                  Search
                </Text>
              </Heading>
              <Input
                borderColor="blue"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products"
              />
              <Heading
                mb="0.7rem"
                mt="2rem"
                display="flex"
                size="sm"
                fontWeight="medium"
              >
                <HiOutlineCash />{' '}
                <Text fontWeight="semibold" ml=".7rem">
                  Price
                </Text>
              </Heading>
              <Box>
                <Text>{value}.00 DA</Text>
                <Slider
                  flex="1"
                  focusThumbOnChange={false}
                  value={value}
                  onChange={handleChange}
                  max={1000000}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Divider color="red" marginY="2rem" />
              <Heading mb=".7rem" display="flex" size="sm" fontWeight="medium">
                <HiOutlineTicket />{' '}
                <Text fontWeight="semibold" ml=".7rem">
                  Category
                </Text>
              </Heading>

              <Select
                mb=".5rem"
                name="category"
                borderColor="teal"
                placeholder="Select a cateogry"
                onChange={value => setCategory(value.target.value)}
              >
                {tags.map(tag => (
                  <option key={tag.id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </Select>

              <Button
                onClick={() => {
                  fetchProducts();
                  fetchProductsCount();
                }}
                mt="3rem"
                colorScheme="blue"
                isFullWidth
              >
                Submit
              </Button>
            </Box>
            <Box
              mb="1rem"
              rounded="lg"
              p="2rem"
              pt="0"
              width={['100%', '100%', '100%', '72%']}
            >
              <Flex
                gridGap=".5rem"
                alignItems="center"
                bg="gray.100"
                p="1rem"
                marginBottom="2rem"
              >
                <Flex>
                  <CgLayoutList
                    cursor="pointer"
                    onClick={() => setIsGrid(false)}
                    size={40}
                    color={isGrid ? '#AAA' : 'teal'}
                  />
                  <CgLayoutGrid
                    cursor="pointer"
                    onClick={() => setIsGrid(true)}
                    size={40}
                    color={!isGrid ? '#AAA' : 'teal'}
                  />
                </Flex>
                <Text>Product found ({pageCount})</Text>
                <Box flexGrow="1">
                  <Divider size="xl" colorScheme="blue" />
                </Box>
                <Box>
                  <Box>
                    <Select
                      onChange={value => {
                        fetchProducts(1, value.target.value);
                      }}
                      placeholder="Sort by"
                    >
                      <option value="currentPrice">price (lowest)</option>
                      <option value="-currentPrice">price (highest)</option>
                      <option value="name">name (a - z)</option>
                      <option value="-name">name (z - a)</option>
                    </Select>
                  </Box>
                </Box>
              </Flex>
              {products.length === 0 && (
                <Heading size="md">
                  Sorry, no products matched your search.
                </Heading>
              )}
              <Flex flexWrap="wrap" justifyContent="space-between" gridGap="1">
                {loadingProducts ? (
                  <Box width="100%" textAlign="center">
                    <Spinner size="xl" />
                  </Box>
                ) : isGrid ? (
                  products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      compact={true}
                    />
                  ))
                ) : (
                  products.map(product => (
                    <ProductCardH
                      key={product.id}
                      product={product}
                      compact={true}
                    />
                  ))
                )}
              </Flex>
              <Box mt="2rem" className="react-paginate">
                <ReactPaginate
                  pageCount={pageCount > 0 ? Math.ceil(pageCount / LIMIT) : 1}
                  containerClassName={'pagination'}
                  onPageChange={page => {
                    fetchProducts(page.selected + 1);
                  }}
                  activeClassName={'active'}
                  nextLabel={<HiChevronRight />}
                  previousLabel={<HiChevronLeft />}
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
