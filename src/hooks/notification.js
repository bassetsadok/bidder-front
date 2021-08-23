import { useContext } from 'react';

import { notificationContext } from '../context/NotificationContext';

export const useNotifs = () => {
  return useContext(notificationContext);
};
