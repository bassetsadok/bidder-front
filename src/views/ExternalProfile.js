import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';
import axios from 'axios';
import { HiMail, HiPhone } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function ExternalProfile() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const storeToken = localStorage.getItem('user-token');
  const [loadingUser, setLoadingUser] = useState({});
  const fetchUser = async () => {
    setLoadingUser(true);
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setLoadingUser(false);
      });

    if (res?.data?.status === 'success') {
      setUser(res?.data?.data);
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />

      <Container
        mt="2rem"
        p="3rem"
        bg="gray.100"
        rounded="lg"
        maxW="container.lg"
      >
        <Flex flexWrap="wrap" align="center">
          <Avatar size="2xl" src={user?.avatar} />
          <Box ml="4rem">
            <Heading mb=".7rem">
              {user?.firstName} {user?.lastName}
            </Heading>
            <Flex align="center">
              <HiMail color="teal" />
              <Text ml=".3rem" fontWeight="semibold">
                {user?.email}
              </Text>
            </Flex>
            <Flex align="center">
              <HiPhone color="teal" />
              <Text ml=".3rem" fontWeight="semibold">
                {user?.phoneNumber}
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Footer />
    </>
  );
}
