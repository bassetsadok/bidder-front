import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  Text,
} from '@chakra-ui/react';

import axios from 'axios';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export default function SuperLogin() {
  const history = useHistory();
  const { setUserAndToken, setUserLoading } = useUser();

  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(6, {
      message: `invalid`,
    }),
  });

  const onSubmit = async values => {
    setUserLoading(true);

    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/super-login`, values)
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setUserLoading(false);
      });

    if (res.data.status === 'success') {
      setUserAndToken(res.data.data.user, res.data.token);
      setUserLoading(false);
      toast.success(`Login as admin with success`);
      history.push('/admin-dashboard');
    }
  };
  return (
    <Flex alignItems="center" justify="center" minH={'100vh'}>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <Heading size="lg" mb="3">
          <Text as={'span'} position={'relative'} zIndex={4}>
            Login Into Your Account.
          </Text>
        </Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, values, errors, loading, isSubmitting }) => (
            <Stack spacing={4}>
              <InputControl
                id="email"
                name="email"
                type="email"
                inputProps={{ placeholder: 'You email address' }}
              />

              <InputControl
                id="password"
                type="password"
                name="password"
                inputProps={{ placeholder: 'You password' }}
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
                LOG IN AS ADMIN
              </Button>
            </Stack>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}
