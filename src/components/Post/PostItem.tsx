import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Post } from '@/src/model/post.model';
import { EditIcon } from '@/src/assets/svgIcon';
import PostDetailModal from './PostDetailModal';
import PostEditForm from './PostEditForm';
type PostItemProps = {
  post: Post;
  onEditSuccess: () => void;
};
const PostItem = ({ post, onEditSuccess }: PostItemProps) => {
  const [showPostDetail, setShowPostDetail] = useState<boolean>(false);
  const [showPostEditForm, setShowPostEditForm] = useState<boolean>(false);
  const handleOpenPostDetailModal = () => {
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
  };
  const handleOpenPostEditForm = () => {
    setShowPostEditForm(true);
  };

  const handleClosePostEditForm = () => {
    setShowPostEditForm(false);
  };
  const postDetailModalProps = {
    postId: post.id,
    showPostDetail,
    closePostDetailModal: handleClosePostDetail,
  } as const;

  const postEditFormProps = {
    postId: post.id,
    showPostEditForm,
    closeEditPostForm: handleClosePostEditForm,
    onEditSuccess: onEditSuccess,
  } as const;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            handleOpenPostDetailModal();
          }}>
          <View style={styles.container}>
            <Text style={styles.title}>Titlte: {post.title}</Text>
            <Text style={styles.meta}>User ID: {post.userId}</Text>
            <Text style={styles.meta}>Post ID: {post.id}</Text>
            <Text style={styles.body}>Body: {post.body}</Text>
            <TouchableOpacity
              style={styles.buttonEdit}
              onPress={() => {
                handleOpenPostEditForm();
              }}>
              <EditIcon />
              <Text style={styles.editLabel}>Edit</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {showPostDetail && <PostDetailModal {...postDetailModalProps} />}
        {showPostEditForm && <PostEditForm {...postEditFormProps} />}
      </SafeAreaView>
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
  buttonEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
