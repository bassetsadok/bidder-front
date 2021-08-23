import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/user';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, userLoading } = useUser();

  if (userLoading)
    return (
      <Flex h="100vh" w="100wh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        user._id ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
