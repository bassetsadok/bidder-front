import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser } from '../../hooks/user';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const { user, userLoading } = useUser();

  if (userLoading)
    return (
      <Flex h="100vh" w="100wh" align="center" justify="center">
        <Spinner />
      </Flex>
    );

  if (!userLoading)
    return (
      <Route
        {...rest}
        render={props =>
          user?.role !== 'admin' ? (
            <Redirect to="/super-login" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
};

export default PrivateAdminRoute;
