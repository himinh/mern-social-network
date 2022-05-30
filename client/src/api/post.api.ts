import { Post, PostsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const postUrl = '/api/posts';
export const postApi = {
  getPosts({ queryKey = ['posts?page=1&limit=1'] }): Promise<PostsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getProfilePosts({ queryKey = ['posts/profile?page=1&limit=1'] }): Promise<PostsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getPost(postId: string): Promise<Post> {
    return axiosInstance.get(`${postUrl}/${postId}`);
  },

  createPost(post: {}): Promise<Post> {
    return axiosInstance.post(`${postUrl}`, post, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  updatePost(updateRequest: {
    filter: { id: string };
    body: { [key: string]: any };
  }): Promise<Post> {
    return axiosInstance.patch(`${postUrl}/${updateRequest.filter.id}`, updateRequest.body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deletePost(postId: string): Promise<Post> {
    return axiosInstance.delete(`${postUrl}/${postId}`);
  },

  likePost(postId: string): Promise<Post> {
    return axiosInstance.patch(`${postUrl}/${postId}/like`, {});
  },

  retweetPost({ postId = '', text = '' }): Promise<Post> {
    return axiosInstance.post(`${postUrl}/${postId}/retweet`, { text });
  },

  deleteRetweetPost(postId: string): Promise<Post> {
    return axiosInstance.delete(`${postUrl}/${postId}/retweet`);
  },
};
