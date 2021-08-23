import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from 'formik-chakra-ui';

import * as Yup from 'yup';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Box, Container, Heading } from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import DeadDatePicker from '../components/sell/DeadDatePicker';
import UploadProductThumbnail from '../components/uploaders/UploadProductThumbnail';
import UploadProductImages from '../components/uploaders/UploadProductImages';

export default function Sell() {
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const acesssToken = localStorage.getItem('user-token');
  const fetchTags = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/categories`
    );
    setTags(res.data.data.docs);
  };
  useEffect(() => {
    fetchTags();
  }, []);

  const initialValues = {
    name: '',
    initialPrice: '',
    deadDate: new Date(),
    category: '',
    description: '',
    thumbnail: '',
    images: [],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Required field !'),
    initialPrice: Yup.number().required('Required field !'),
    category: Yup.string().required('Required field !'),
    description: Yup.string().required('Required field !'),
    deadDate: Yup.date().required('Required field !'),
    thumbnail: Yup.string().required('Required field !'),
    images: Yup.array()
      .required('Required field !')
      .min(1, 'At least upload one image'),
  });
  const onSubmit = async values => {
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/products`, values, {
        headers: {
          Authorization: `Bearer ${acesssToken}`,
        },
      })
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
      });

    if (res.data.status === 'success') {
      toast.success(`Product created !`);
      history.push(`/products/${res.data.data.id}`);
    }
  };

  return (
    <div>
      <Navbar />
      <Box bg="teal.900" color="white" py="6rem">
        <Container maxW="container.lg">
          <Heading
            as="h2"
            textTransform="capitalize"
            size="xl"
            fontWeight="medium"
          >
            Products / Add a product
          </Heading>
        </Container>
      </Box>
      <Box as="section" my="5rem">
        <Container maxW="container.lg">
          <Box borderWidth="3px" borderColor="gray.100" p="3rem" rounded="lg">
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, isValid, values, errors, setFieldValue }) => (
                <Box m="10px auto" as="form" onSubmit={handleSubmit}>
                  {!isValid && (
                    <Alert mb="3" status="warning">
                      <AlertIcon />
                      <AlertTitle>Validation errors</AlertTitle>
                      <AlertDescription></AlertDescription>
                    </Alert>
                  )}
                  <Flex justifyContent="space-between">
                    <Box width={['100%', '100%', '60%', '60%']}>
                      <InputControl
                        mb=".5rem"
                        name="name"
                        label="Product name"
                      />
                      <SelectControl
                        mb=".5rem"
                        name="category"
                        label="Select category"
                        selectProps={{ placeholder: 'Select category' }}
                      >
                        {tags.map(tag => (
                          <option value={tag._id}>{tag.name}</option>
                        ))}
                      </SelectControl>
                      <InputControl
                        mb=".5rem"
                        name="initialPrice"
                        label="Initial price"
                      />
                      <TextareaControl name="description" label="Description" />
                      <Box py="1rem">
                        <Text>Pick up the expiration date</Text>
                        <DeadDatePicker
                          setFieldValue={setFieldValue}
                          value={values.deadDate}
                        />
                      </Box>

                      <SubmitButton isFullWidth py="1rem">
                        Submit
                      </SubmitButton>

                      {/* 
                      <Box as="pre" marginY={10}>
                        {JSON.stringify(values, null, 2)}
                        <br />
                        {JSON.stringify(errors, null, 2)}
                      </Box> */}
                    </Box>
                    <Box width={['100%', '100%', '35%', '35%']}>
                      <Heading
                        textTransform="capitalize"
                        fontWeight="semibold"
                        size="md"
                        mb="1.5rem"
                      >
                        Media
                      </Heading>
                      <Alert mb="1.5rem">
                        <AlertIcon />
                        <AlertTitle mr={2}> Upload 1 image </AlertTitle>
                      </Alert>
                      {!values.thumbnail && (
                        <UploadProductThumbnail
                          error={errors.thumbnail}
                          filled={values.thumbnail}
                          setFieldValue={setFieldValue}
                        />
                      )}
                      {errors.thumbnail && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle mr={2}>Required</AlertTitle>
                        </Alert>
                      )}
                      {values.thumbnail && (
                        <>
                          <Button
                            onClick={() => {
                              setFieldValue('thumbnail', '');
                            }}
                            leftIcon={<HiOutlineTrash />}
                            colorScheme="red"
                            mb=".8rem"
                            variant="solid"
                          >
                            Delete the thumbnail
                          </Button>
                          <Image
                            src={values.thumbnail}
                            rounded="lg"
                            width="100%"
                          />
                        </>
                      )}
                      <Alert>
                        <AlertIcon />
                        <AlertTitle mr={2}> Upload up to 4 images</AlertTitle>
                      </Alert>
                      {errors.images && (
                        <Alert status="error">
                          <AlertIcon />
                          <AlertTitle mr={2}>Required</AlertTitle>
                        </Alert>
                      )}
                      <UploadProductImages
                        completed={values.images === 4}
                        errors={errors.images}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Flex>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
