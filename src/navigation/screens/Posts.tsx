import { StyleSheet, FlatList, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Post } from '@/src/model/post.model';
import { useDebounce } from '@/src/hooks/useDebounce';
import { getAllPosts } from '@/src/services/post.services';
import PostItem from '@/src/components/Post/PostItem';


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchInput = useDebounce(searchTerm, 300);

  const handleGetAllPosts = async () => {
    try {
      let response = await getAllPosts();
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
        post.title.toLowerCase().includes(debouncedSearchInput.toLowerCase())
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
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Text style={styles.header}>Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostItem post={item} onEditSuccess={handleGetAllPosts}/>}
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
