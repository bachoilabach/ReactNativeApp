import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { PostDetailModalProps } from '@/src/props/post.prop';
import { Post } from '@/src/model/post.model';
import { getPostById } from '@/src/services/post.services';

const PostDetailModal = ({
  postId,
  showPostDetail,
  closePostDetailModal,
}: PostDetailModalProps) => {
  const [postDetail, setPostDetail] = useState<Post>();
  const [isReady, setIsReady] = useState<boolean>(false);

  const handleGetPostById = async () => {
    try {
      setIsReady(false);
      const response = await getPostById(postId);
      setPostDetail(response);
      setIsReady(true);
    } catch (error) {
      setIsReady(true);
    }
  };
  useEffect(() => {
    handleGetPostById();
  }, [postId]);

  return (
    <>
      {isReady && (
        <Modal
          visible={showPostDetail}
          animationType="fade"
          transparent={true}
          onRequestClose={closePostDetailModal}>
          <TouchableWithoutFeedback onPress={closePostDetailModal}>
            <View style={styles.container}>
              <View style={styles.modalContent}>
                <View>
                  <Text style={styles.title}>Title: {postDetail.title}</Text>
                  <Text style={styles.meta}>User ID: {postDetail.userId}</Text>
                  <Text style={styles.meta}>Post ID: {postDetail.id}</Text>
                  <Text style={styles.body}>Body: {postDetail.body}</Text>
                  <TouchableOpacity
                    style={[styles.buttonClose, styles.button, styles.flexEnd]}
                    onPress={closePostDetailModal}>
                    <Text style={[styles.buttonCloseText, styles.buttonText]}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
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
    height: '50%',
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
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  body: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
    textAlign: 'justify',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonClose: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  buttonCloseText: {
    color: 'black',
  },
});
