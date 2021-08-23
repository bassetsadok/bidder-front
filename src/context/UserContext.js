import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { db } from '../firebase.config';
export const UserContext = createContext({
  user: {},
  userLoading: {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const [userLoading, setUserLoading] = useState(true);

  const setUserAndToken = (user, token) => {
    setUser({ token, ...user });
    localStorage.setItem('user-token', token);
  };
  const resetUser = () => {
    setUser({});
    localStorage.removeItem('user-token');
    firebase.auth().signOut();
  };

  // useEffect(() => {
  //   const getasync = async () => {
  //     let notifs = [];
  //     if (user._id) {
  //       db.collection('notifications')
  //         .where('user', '==', user._id)
  //         .get()
  //         .then(querySnapshot => {
  //           querySnapshot.forEach(doc => {
  //             // doc.data() is never undefined for query doc snapshots
  //             console.log(doc.id, ' => ', doc.data());
  //             notifs.push(doc.data());
  //           });

  //           setUserNotifs(notifs);
  //         })
  //         .catch(error => {
  //           console.log('Error getting documents: ', error);
  //         });
  //     }
  //   };
  //   getasync();
  // }, [user]);
  useEffect(() => {
    const getUser = async () => {
      setUserLoading(true);
      const storeToken = await localStorage.getItem('user-token');

      if (storeToken) {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/me`,
          {
            headers: {
              Authorization: `Bearer ${storeToken}`,
            },
          }
        );

        if (res.data.status === 'success') {
          setUser(res.data.data);

          setUserLoading(false);
        } else {
          resetUser();
          setUserLoading(false);
        }
      }
    };

    getUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUserAndToken,
        setUser,
        resetUser,
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserConsumer = UserContext.Consumer;
