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
import firebase from 'firebase';
import { Link as BrowserLink } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/user';
import LoginImg from '../assets/undraw_Connected_re_lmq2.svg';

export default function Login() {
  const history = useHistory();
  const { setUserAndToken, setUserLoading } = useUser();
  const onSubmit = async values => {
    setUserLoading(true);
    const res = await axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, values)
      .catch(function (error) {
        toast.error(error.response.data.message);
        setUserLoading(false);
      });

    if (res.data.status === 'success') {
      setUserAndToken(res.data.data.user, res.data.token);
      firebase
        .auth()
        .signInWithCustomToken(res.data.firebaseCustomToken)
        .then(userCredential => {
          // Signed in
          var user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch(error => {
          var errorMessage = error.message;
          console.log(errorMessage);
          // ...
        });
      setUserLoading(false);
      toast.success(`Login with success`);
      history.push('/');
    }
  };
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
  return (
    <Flex minH={'100vh'}>
      <Stack
        bg="gray.100"
        width={['100%', '100%', '50%', '50%']}
        py={12}
        px={12}
      >
        <Stack>
          <Heading mb="3">
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
              Login Into Your Account.
            </Text>
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
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
                  SIGN IN
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
                      to="/register"
                      as={BrowserLink}
                      color={'teal.400'}
                    >
                      You don't have an account ? Sign up
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Formik>
        </Box>
      </Stack>

      <Flex
        display={['none', 'none', 'flex', 'flex']}
        p="5"
        width={['100%', '100%', '50%', '50%']}
      >
        <Image boxSize="100%" objectFit="contain" src={LoginImg} />
      </Flex>
    </Flex>
  );
}
