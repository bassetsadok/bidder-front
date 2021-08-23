import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import firebase from 'firebase';
import { useUser } from '../hooks/user';
import { db } from '../firebase.config';

import axios from 'axios';

export const notificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const { user } = useUser();
  const [fbuser, setFbuser] = useState({});

  const [notifs, setNotifs] = useState([]);
  const accessToken = localStorage.getItem('user-token');
  //

  useEffect(() => {
    if (user && accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/users/firebase/auth`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(data => {
          console.log(data, 'fb token');
          firebase
            .auth()
            .signInWithCustomToken(data?.data?.firebaseCustomToken)
            .then(data => {
              setFbuser(data);
            })
            .catch(err => {
              // handeling error
              console.error(err, 'firebase error');
            });
        });
    }
  }, [user, accessToken]);

  const getNotifs = useCallback(async () => {
    if (user) {
      try {
        const listener = await db;
        db.collection('notifications')
          .where('user', '==', user._id.toString())
          .orderBy('timestamp', 'desc')
          .onSnapshot(async snapShot => {
            if (snapShot) {
              const docs = await snapShot.docs.map(doc => {
                return { ...doc.data(), uid: doc.id };
              });
              const inbox = await Promise.all(
                docs.map(async doc => {
                  return doc;
                })
              );
              console.log(inbox, 'inbox');

              setNotifs(inbox);
              setCount(
                inbox.reduce((sum, item) => {
                  return !item.read ? sum + 1 : sum;
                }, 0)
              );
            }
          });

        return listener;
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const makeRead = uid => {
    db.collection('notifications').doc(uid).update({ read: true });
  };
  useEffect(() => {
    let listener;

    (async () => {
      if (user && fbuser.user?.uid) {
        listener = await getNotifs(fbuser.user?.uid).catch(err => {
          // handeling error
        });
        return () => {
          listener();
        };
      } else if (!user && notifs?.length > 0) {
        setNotifs([]);
        listener();
      }
    })();
  }, [user, fbuser, getNotifs]);

  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <notificationContext.Provider
      value={{
        notificationCount: count,
        setNotificationCount: setCount,
        notifs: notifs,
        getNotifs: getNotifs,
        makeRead,
      }}
    >
      {memoizedChildren}
    </notificationContext.Provider>
  );
};

export const UserConsumer = notificationContext.Consumer;
