import http from '../config/axios';
import { Post } from '../model/Post.model'

export const getAllPosts = async (): Promise<Post[]> => {
  const response = await http.get('/posts');
  return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
  const response = await http.get(`/posts/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  let response = await http.get('/users/');
  return response.data;
};

export const editPost = async(id: number,data: object) : Promise<Post> => {
  let response = await http.put(`/posts/${id}`,data)
  return response.data
}