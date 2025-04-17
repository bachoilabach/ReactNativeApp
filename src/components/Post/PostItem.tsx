import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { PostProps } from '../../interface/PostInterface';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PostDetailModal from '../modal/PostDetailModal';

const PostItem = ({ userId, id, title, body }: PostProps) => {
	const [showPostDetail, setShowPostDetail] = useState<boolean>(false);
	const handleOpenPostDetailModal = () => {
		setShowPostDetail(true);
	};

	const handleClosePostDetail = () => {
		setShowPostDetail(false);
	};
	return (
		<SafeAreaProvider>
			<SafeAreaProvider>
				<TouchableOpacity onPress={handleOpenPostDetailModal}>
					<View style={styles.container}>
						<Text style={styles.title}>Titlte: {title}</Text>
						<Text style={styles.meta}>User ID: {userId}</Text>
						<Text style={styles.meta}>Post ID: {id}</Text>
						<Text style={styles.body}>Body: {body}</Text>
					</View>
				</TouchableOpacity>
				{showPostDetail && (
					<PostDetailModal
						postId={id}
						showPostDetail={showPostDetail}
						closePostDetailModal={handleClosePostDetail}
					/>
				)}
			</SafeAreaProvider>
		</SafeAreaProvider>
	);
};

export default PostItem;

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: '#f9f9f9',
		marginBottom: 10,
		borderRadius: 8,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	body: {
		fontSize: 14,
		color: '#333',
		marginBottom: 8,
		flexWrap: 'wrap',
		textAlign: 'justify',
	},
	meta: {
		fontSize: 12,
		color: '#666',
	},
});
