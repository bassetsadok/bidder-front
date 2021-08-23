import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import BannedProductCard from './BannedProductCard';

export default function Main() {
  //{{URL}}/api/v1/products/bids/pending
  const [pendings, setPendings] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [reports, setReports] = useState([]);

  const [markedAsSold, setMarkedAsSold] = useState([]);

  const [expiredProducts, setExpiredProducts] = useState([]);

  const [category, setCategory] = useState('');

  const storeToken = localStorage.getItem('user-token');
  const fetchPendings = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-pendings`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setPendings(res?.data?.data);
    }
  };
  const fetchAllUsers = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setUsers(res?.data?.data.docs);
    }
  };
  const fetchMarkedAsSold = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products?sold=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setMarkedAsSold(res?.data?.data.docs);
    }
  };

  const fetchProducts = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setProducts(res?.data?.data.docs);
    }
  };

  const fetchExpiredProducts = async () => {
    const res = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/v1/products/super/all-products?expired=true`,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setExpiredProducts(res?.data?.data.docs);
    }
  };

  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );
    setTags(res.data.data.docs);
  };

  const fetchReports = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/reports`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setReports(res?.data?.data.docs);
    }
  };
  //{{URL}}/api/v1/categories
  const addCategory = async () => {
    const res = await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/v1/categories`,
        {
          name: category,
        },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      )
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.data?.status === 'success') {
      setTags([...tags, res.data.data]);
      toast.success('Category added');
    }
  };
  const deleteCategory = async id => {
    const res = await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.status === 204) {
      const newTags = tags.filter(tag => tag._id !== id);
      setTags(newTags);
      toast.warn('Category removed');
    }
  };

  const deleteUser = async id => {
    const res = await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res?.status === 204) {
      toast.warn('User was deleted ...');
      fetchAll();
    }
  };
  const fetchAll = () => {
    fetchPendings();
    fetchAllUsers();
    fetchMarkedAsSold();
    fetchProducts();
    fetchExpiredProducts();
    fetchTags();
    fetchReports();
  };
  useEffect(() => {
    fetchPendings();
    fetchAllUsers();
    fetchMarkedAsSold();
    fetchProducts();
    fetchExpiredProducts();
    fetchTags();
    fetchReports();
  }, []);
  return (
    <div>
      <Navbar />
      <Box py="3rem">
        <Container maxW="container.lg">
          <Heading as="h2" size="lg">
            Statistics
          </Heading>
          <Flex wrap="wrap">
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                All users
              </Heading>
              <Heading as="h4" size="md">
                {users.length}
              </Heading>
            </Box>
            <Box
              to="/super-products"
              as={BrowserLink}
              _hover={{ bg: 'gray.100' }}
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                All products
              </Heading>
              <Heading as="h4" size="md">
                {products.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Sold products
              </Heading>
              <Heading as="h4" size="md">
                {markedAsSold.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Expired products
              </Heading>
              <Heading as="h4" size="md">
                {expiredProducts.length}
              </Heading>
            </Box>
            <Box
              borderColor="gray.400"
              borderWidth="1px"
              rounded="lg"
              my="7px"
              p="3rem"
              m="6px"
              w={['100%', '100%', '32%', '30%']}
            >
              <Heading mb="1rem" fontWeight="medium" size="md">
                Pending products
              </Heading>
              <Heading as="h4" size="md">
                {pendings.length}
              </Heading>
            </Box>
          </Flex>

          <Box py="3rem">
            <Container maxW="container.lg">
              <Heading as="h2" size="lg">
                Users
              </Heading>

              <Box height="70vh" overflow="auto">
                {users.map(user => {
                  return (
                    <HStack marginBottom="1.5rem" align="center">
                      <HStack>
                        <Avatar src={user.avatar} />
                        <Box>
                          <Text>
                            {user.firstName} {user.lastName}
                          </Text>
                        </Box>
                      </HStack>
                      <Box flexGrow="1" textAlign="right">
                        <Button
                          onClick={() => deleteUser(user._id)}
                          width="10rem"
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                        <br />
                        <Button
                          // as={BrowserLink}
                          // to={`/users/${user._id}`}
                          mt="7px"
                          width="10rem"
                        >
                          View profile
                        </Button>
                      </Box>
                    </HStack>
                  );
                })}
              </Box>
            </Container>
          </Box>

          <Box py="3rem">
            <Container maxW="container.lg">
              <Heading as="h2" mb="2rem" size="lg">
                Admin actions
              </Heading>

              <Heading size="sm">Create a cateogry</Heading>
              <Flex justify="space-between" flexWrap="wrap">
                <Box w={['100%', '100%', '47%', '47%']}>
                  <Flex align="center">
                    <InputGroup height="3rem" maxW="30rem" size="lg">
                      <Input
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        height="3rem"
                        placeholder="Enter a category name"
                      />
                    </InputGroup>
                    <Button
                      height="3rem"
                      onClick={addCategory}
                      colorScheme="blue"
                    >
                      +
                    </Button>
                  </Flex>
                </Box>
                <Box w={['100%', '100%', '50%', '50%']}>
                  <Flex flexWrap="wrap" justify="space-between">
                    {tags.map(tag => (
                      <Flex
                        align="center"
                        justify="center"
                        m="3px"
                        p=".5rem"
                        rounded="lg"
                        bg="gray.100"
                      >
                        <Box>{tag.name}</Box>
                        <IconButton
                          onClick={() => deleteCategory(tag._id)}
                          ml="2"
                          colorScheme="red"
                          size="sm"
                          icon={<HiTrash />}
                        />
                      </Flex>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Box>

          <Box py="3rem">
            <Container maxW="container.lg">
              <Heading as="h2" mb="2rem" size="lg">
                Reports
              </Heading>
              {reports.length === 0 && (
                <Heading size="md">There is no reports</Heading>
              )}
              {reports.map(report => (
                <BannedProductCard
                  product={report?.product}
                  reporter={report?.user}
                  description={report?.description}
                  reportId={report?._id}
                  fetchAll={fetchReports}
                />
              ))}
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
