import { postApi } from 'api/post.api';
import { AxiosError } from 'axios';
import { useAuthContext } from 'hooks/useAppContext';
import { Post } from 'interface';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { handlerError } from 'utils/handleError';
import { options } from './options.type';

export const usePosts = (
  { postedBy = '', followingOnly = true, search = '', page = 1, limit = 1, sort = '-createdAt' },
  options?: options
) => {
  const queryClient = useQueryClient();
  const searchQuery = search ? `&search=${search}` : '';
  const postedByQuery = postedBy ? `&postedBy=${postedBy}` : '';

  const queryKey = `posts?page=${page}&limit=${limit}&sort=${sort}&followingOnly=${followingOnly}${searchQuery}${postedByQuery}`;
  if (sort !== '-numberLikes') queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getPosts, {
    onError: handlerError,
    ...options,
  });
};

export const useProfilePosts = (
  { postedBy = '', page = 1, limit = 1, onlyReply = false },
  options?: options
) => {
  const queryClient = useQueryClient();
  const postedByQuery = postedBy ? `&postedBy=${postedBy}` : '';

  const queryKey = `posts/profile?page=${page}&limit=${limit}&onlyReply=${onlyReply}${postedByQuery}`;

  queryClient.setQueryData('postsKey', queryKey);

  return useQuery(queryKey, postApi.getProfilePosts, {
    onError: handlerError,
    ...options,
  });
};

export const usePostById = ({ postId = '' }, options?: options) => {
  return useQuery(`posts/${postId}`, () => postApi.getPost(postId), {
    onError: handlerError,
    ...options,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const postsKey = queryClient.getQueryData('postsKey');

  return useMutation(postApi.createPost, {
    onError: handlerError,
    onSettled: () => {
      return queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey === postsKey;
        },
      });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuthContext();
  const postsKey = queryClient.getQueryData<string>('postsKey');

  return useMutation(postApi.likePost, {
    onMutate: (postId) => {
      if (!postsKey || !auth) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth.id);
      });
    },

    onSuccess: () => {},
    onError: (err: Error | AxiosError<any, any>, postId) => {
      if (!postsKey || !auth) return;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        return updatePostLikes(oldData, postId, auth.id);
      });
      handlerError(err);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.updatePost, {
    onMutate: (data) => {
      const postsKey = queryClient.getQueryData('postsKey') as string;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        const index = oldData.posts.findIndex((post: Post) => post.id === data.filter.id);
        // Update pinned
        if (data.body?.pinned !== undefined) {
          oldData.posts[index].pinned = data.body.pinned;
          return oldData;
        }

        // Update hidden
        if (data.body?.hidden !== undefined) {
          if (data.body.hidden) oldData.posts.splice(index, 1);
          else oldData.posts[index].hidden = data.body.hidden; // false

          return oldData;
        }

        return oldData;
      });
    },

    onSuccess: (data) => {
      console.log({ msg: 'updated post sucessfully!', data });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.deletePost, {
    onMutate: (postId) => {
      const postsKey = queryClient.getQueryData('postsKey') as string;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        // Get index
        const index = oldData.posts.findIndex((post: Post) => post.id === postId);

        // Remove
        oldData.posts.splice(index, 1);

        return oldData;
      });
    },
    onError: handlerError,
  });
};

export const useDeleteRetweetPost = () => {
  const queryClient = useQueryClient();

  return useMutation(postApi.deleteRetweetPost, {
    onMutate: (postId) => {
      const postsKey = queryClient.getQueryData('postsKey') as string;

      queryClient.setQueryData(postsKey, (oldData: any) => {
        // Get index
        const index = oldData.posts.findIndex((post: Post) => post.id === postId);

        // Remove
        oldData.posts.splice(index, 1);

        return oldData;
      });
    },
    onError: handlerError,
  });
};

export const useRetweetPost = () => {
  const queryClient = useQueryClient();

  const postsKey = queryClient.getQueryData('postsKey');

  return useMutation(postApi.retweetPost, {
    onSuccess: (data) => {
      queryClient.setQueryData(postsKey as string, (oldData: any) => {
        oldData.posts.unshift(data);
        console.log({ data, oldData });
        return oldData;
      });
    },
    onError: handlerError,
  });
};

const updatePostLikes = (oldData: any, postId: string, userId: string) => {
  const newPosts = oldData?.posts.map((post: Post) => {
    if (post.id === postId) {
      if (post.likes.includes(userId)) {
        const likes = post.likes.filter((id) => id !== userId);
        return { ...post, likes: likes };
      }
      return { ...post, likes: post.likes.concat(userId) };
    }
    return post;
  });

  return { ...oldData, posts: newPosts };
};
