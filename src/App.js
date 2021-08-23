import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import firebase from 'firebase';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

import Home from './views/Home';
import Login from './views/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from './context/UserContext';
import Register from './views/Register';
import Product from './views/Product';
import Sell from './views/Sell';
import Products from './views/Products';
import './style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Profile from './views/Profile';
import PrivateRoute from './components/routes/PrivateRoute';
import PrivateAdminRoute from './components/routes/PrivateAdminRoute';
import SuperLogin from './components/admin/SuperLogin';
import Main from './components/admin/Main';
import SuperProducts from './components/admin/SuperProducts';
import ExternalProfile from './views/ExternalProfile';
import EditProfile from './views/EditProfile';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <ChakraProvider theme={theme}>
          <div className="App">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              style={{ borderRadius: 60, fontWeight: 'bold' }}
            />
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/super-login" component={SuperLogin} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/sell" component={Sell} />
                <PrivateAdminRoute
                  path="/admin-dashboard"
                  exact
                  component={Main}
                />
                <PrivateAdminRoute
                  path="/super-products"
                  exact
                  component={SuperProducts}
                />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/:id" component={Product} />
                <Route exact path="/user/:id" component={ExternalProfile} />
                <Route exact path="/edit-profile" component={EditProfile} />
              </Switch>
            </BrowserRouter>
          </div>
        </ChakraProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
