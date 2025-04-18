import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { getPostById } from '../../services/post.services';
import { useFocusEffect } from '@react-navigation/native';
import { PostProps } from '../../interface/PostInterface';

const PostDetailModal = ({
  postId,
  showPostDetail,
  closePostDetailModal,
}: {
  postId: string;
  showPostDetail: boolean;
  closePostDetailModal: () => void;
}) => {
  const [postDetail, setPostDetail] = useState<PostProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetPostById = async () => {
    try {
      setLoading(true);
      const response = await getPostById(postId);
      setPostDetail(response);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (showPostDetail) {
        handleGetPostById();
      }
      console.log('Focus vào modal');
      return () => {
        console.log('Đã rời khỏi modal');
      };
    }, [showPostDetail, postId])
  );

  return (
    <Modal
      visible={showPostDetail}
      animationType="fade"
      transparent={true}
      onRequestClose={closePostDetailModal}>
      <TouchableWithoutFeedback
        onPress={closePostDetailModal}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                />
              ) : (
                <View>
                  <View>
                    <Text style={styles.title}>
                      Title: {postDetail?.title}
                    </Text>
                    <Text style={styles.meta}>
                      User ID: {postDetail?.userId}
                    </Text>
                    <Text style={styles.meta}>
                      Post ID: {postDetail?.id}
                    </Text>
                    <Text style={styles.body}>
                      Body: {postDetail?.body}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={closePostDetailModal}>
                    <Text style={styles.buttonCloseText}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PostDetailModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'justify',
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    textAlign: 'justify',
  },
  buttonClose: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  buttonCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
