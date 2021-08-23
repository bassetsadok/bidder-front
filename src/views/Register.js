import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  useColorModeValue,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/user';

export default function Register() {
  const history = useHistory();
  const { setUserAndToken, setUserLoading } = useUser();
  const onSubmit = async values => {
    setUserLoading(true);
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/signup`, values)
      .catch(function (error) {
        console.log(error.response);
        toast.error(error.response.data.message);
        setUserLoading(false);
      });

    if (res.data.status === 'success') {
      toast.success(`Signup with success`);
      history.push('/');
      setUserAndToken(res.data.data.user, res.data.token);
      setUserLoading(false);
    }
  };
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required().min(3).label('First name'),
    lastName: Yup.string().required().min(3).label('Last name'),
    email: Yup.string().email().required().label('Email field'),
    phoneNumber: Yup.string()
      .required()
      .matches(/^(0)(5|6|7)[0-9]{8}$/, 'Please enter a valid phone number')
      .label('Phone number'),
    password: Yup.string()
      .required()
      .min(6, {
        message: `invalid`,
      })
      .label('Password'),
    passwordConfirm: Yup.string()
      .required()
      .label('Password confimation is a required field')
      .oneOf([Yup.ref('password')], 'Password is not match'),
  });
  return (
    <Flex minH={'100vh'}>
      <Flex
        display={['none', 'none', 'flex', 'flex']}
        width={['100%', '100%', '48%', '48%']}
      >
        <Image
          boxSize="100%"
          objectFit="cover"
          src={
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
          }
        />
      </Flex>

      <Stack width={['100%', '100%', '50%', '50%']} py={12} px={12}>
        <Stack>
          <Heading mb="15">
            <Text
              as={'span'}
              position={'relative'}
              zIndex={4}
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
              Create Your Account For Free.
            </Text>
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} p={8}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, values, errors, loading, isSubmitting }) => (
              <Stack spacing={4}>
                <InputControl
                  id="firstName"
                  type="text"
                  name="firstName"
                  inputProps={{ placeholder: 'First Name' }}
                />

                <InputControl
                  id="lastName"
                  type="text"
                  name="lastName"
                  inputProps={{ placeholder: 'Last Name' }}
                />
                <InputControl
                  id="email"
                  name="email"
                  type="email"
                  inputProps={{ placeholder: 'Email Address' }}
                />
                <InputControl
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  inputProps={{ placeholder: 'Phone number' }}
                />

                <InputControl
                  id="password"
                  type="text"
                  name="password"
                  inputProps={{ placeholder: 'Password' }}
                />

                <InputControl
                  id="passwordConfirm"
                  type="text"
                  name="passwordConfirm"
                  inputProps={{ placeholder: 'Confrim your Password' }}
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
                  SIGN UP
                </Button>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <div></div>
                    <Link
                      fontWeight="bold"
                      to="/login"
                      as={BrowserLink}
                      color={'teal.400'}
                    >
                      You already have an account ? Login
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
