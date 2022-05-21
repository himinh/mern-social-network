import { notificationApi } from 'api/notification.api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const useNotifications = (
  { page = 1, limit = 1, sort = 'opened,-createdAt' },
  options?: options
) => {
  const queryKey = `notifications?page=${page}&limit=${limit}&sort=${sort}`;

  return useQuery(queryKey, notificationApi.getNotifications, {
    onError: handlerError,
    ...options,
  });
};

export const useCountNotifications = ({ opened = false }, options?: options) => {
  const queryKey = `notifications/count?opened=${opened}`;

  return useQuery(queryKey, notificationApi.count, {
    onError: handlerError,
    ...options,
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(notificationApi.deleteNotification, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('notifications');
        },
      });
    },
  });
};

export const useMarkAsOpened = () => {
  const queryClient = useQueryClient();

  return useMutation(notificationApi.updateMany, {
    onError: handlerError,
    onSuccess: (data) => {
      console.log({ data });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.toString().startsWith('notifications');
        },
      });
    },
  });
};