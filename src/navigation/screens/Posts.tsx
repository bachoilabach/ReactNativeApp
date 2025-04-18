import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  getAllPost,
  getAllUsers,
} from '../../services/post.services';
import { PostProps } from '../../interface/PostInterface';

import PostItem from '../../components/Post/PostItem';
import { useDebounce } from '../../hooks/useDebounce';

export default function Posts() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [searchInput, setSearchInput] =
    useState<string>('');
  const debouncedSearchInput = useDebounce(
    searchInput,
    300
  );

  const handleGetAllPosts = async () => {
    try {
      let response = await getAllPost();
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    handleGetAllPosts();
  }, []);

  useEffect(() => {
    if (debouncedSearchInput) {
      const filteredPosts = posts.filter((post) =>
        post.title
          .toLowerCase()
          .includes(debouncedSearchInput.toLowerCase())
      );
      setPosts(filteredPosts);
    } else {
      handleGetAllPosts();
    }
  }, [debouncedSearchInput]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.searchText}>Tìm kiếm</Text>
        <TextInput
          style={styles.searchInput}
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <Text style={styles.header}>Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem {...item} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchText: {
    fontSize: 16,
    fontWeight: 500,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 10,
  },
});
