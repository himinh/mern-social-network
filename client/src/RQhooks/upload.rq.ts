import { useMutation, useQueryClient } from 'react-query';
import { uploadApi } from 'api/upload.api';
import { handlerError } from 'utils/handleError';

export const useUploadCoverPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation('upload_cover_photo', uploadApi.uploadCoverPhoto, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => query.queryKey === 'profile',
      });
    },
  });
};