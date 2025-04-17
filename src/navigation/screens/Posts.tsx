import { StyleSheet, FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getAllPost } from '../../services/post.services';
import { PostProps } from '../../interface/PostInterface';
import PostDetailModal from '../../components/modal/PostDetailModal';
import PostItem from '../../components/Post/PostItem';

export default function Posts() {
	const [posts, setPosts] = useState<PostProps[]>([]);

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

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Text style={styles.header}>Posts</Text>
				<FlatList
					data={posts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<PostItem {...item} />
					)}
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
});
