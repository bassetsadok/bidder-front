import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Avatar, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { HiMail, HiPhone } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useUser } from '../hooks/user';
import { InputControl } from 'formik-chakra-ui';
import { Formik } from 'formik';

export default function EditProfile() {
  const { user } = useUser();

  const storeToken = localStorage.getItem('user-token');

  const updateMe = async values => {
    const res = await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/update-me`,
        values,
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
      toast.success('updated');
    }
  };

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required().min(3).label('First name'),
    lastName: Yup.string().required().min(3).label('Last name'),
    phoneNumber: Yup.string()
      .required()
      .matches(/^(0)(5|6|7)[0-9]{8}$/, 'Please enter a valid phone number')
      .label('Phone number'),
  });
  return (
    <>
      <Navbar />
      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.lg">
          <Heading
            as="h2"
            textTransform="capitalize"
            size="lg"
            fontWeight="medium"
          >
            Edit My Profile
          </Heading>
        </Container>
      </Box>
      <Container
        mt="2rem"
        p="3rem"
        borderWidth="1px"
        borderColor="gray.300"
        rounded="lg"
        maxW="container.lg"
      >
        <Box ml="4rem">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={updateMe}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors, loading, isSubmitting }) => (
              <Box>
                <InputControl
                  mb=".8rem"
                  id="firstName"
                  type="text"
                  name="firstName"
                  inputProps={{ placeholder: 'First Name' }}
                />

                <InputControl
                  mb=".8rem"
                  id="lastName"
                  type="text"
                  name="lastName"
                  inputProps={{ placeholder: 'Last Name' }}
                />
                <Input
                  mb=".8rem"
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  value={user.email}
                />
                <InputControl
                  mb=".8rem"
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  inputProps={{ placeholder: 'Phone number' }}
                />

                <Button
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                  onClick={handleSubmit}
                  bg={'teal.400'}
                  color={'white'}
                  _hover={{
                    bg: 'teal.500',
                  }}
                >
                  UPDATE
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
