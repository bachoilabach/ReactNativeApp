import axios from 'axios';

export const getAllPost = async () => {
  let response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts/'
  );
  return response.data;
};

export const getPostById = async (id: string) => {
  let response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
};

export const getAllUsers = async () => {
  let response = await axios.get(
    'https://jsonplaceholder.typicode.com/users/'
  );
  return response.data;
};
