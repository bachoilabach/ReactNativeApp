import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  editPost,
  getPostById,
} from '../../services/post.services';
import { Post } from '../../model/Post.model';

const PostDetailModal = ({
  postId,
  showPostDetail,
  closePostDetailModal,
  actionEdit,
  onEditSuccess,
}: {
  postId: number;
  showPostDetail: boolean;
  closePostDetailModal: () => void;
  actionEdit: boolean;
  onEditSuccess: () => void;
}) => {
  const [postDetail, setPostDetail] = useState<Post>();
  const [isReady, setIsReady] = useState<boolean>(false);

  const changeInput = (field: keyof Post, value: string) => {
    setPostDetail((prev) => (prev ? { ...prev, [field]: value } : undefined));
  };

  const handleGetPostById = async () => {
    try {
      setIsReady(false);
      const response = await getPostById(postId);
      setPostDetail(response);
      setIsReady(true);
    } catch (error) {
      console.log(error);
      setIsReady(true);
    }
  };

  const handleEditPost = async () => {
    try {
      await editPost(postId, {
        title: postDetail?.title,
        body: postDetail?.body,
      });
      onEditSuccess();
      closePostDetailModal();
    } catch (error) {
      console.log(error);
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
            {actionEdit ? (
              // * Edit
              <View style={styles.container}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.editText}>Edit</Text>
                    <View>
                      <Text style={styles.meta}>
                        User ID: {postDetail?.userId}
                      </Text>
                      <Text style={styles.meta}>Post ID: {postDetail?.id}</Text>

                      <View style={styles.inputContainer}>
                        <View style={styles.inputField}>
                          <Text style={styles.label}>Title:</Text>
                          <TextInput
                            style={styles.input}
                            value={postDetail?.title}
                            multiline={true}
                            onChangeText={(text) => changeInput('title', text)}
                          />
                        </View>
                        <View style={styles.inputField}>
                          <Text style={styles.label}>Body:</Text>
                          <TextInput
                            style={[styles.input, styles.bodyInput]}
                            value={postDetail?.body}
                            onChangeText={(text) => changeInput('body', text)}
                            multiline={true}
                          />
                        </View>
                      </View>
                      <View style={styles.actionButtonsWrapper}>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonSave]}
                          onPress={handleEditPost}>
                          <Text
                            style={[styles.buttonText, styles.buttonSaveText]}>
                            Save
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={closePostDetailModal}>
                          <Text
                            style={[styles.buttonCloseText, styles.buttonText]}>
                            Close
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : (
              // * Show detail
              <View style={styles.container}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <View>
                      <Text style={styles.title}>
                        Title: {postDetail?.title}
                      </Text>
                      <Text style={styles.meta}>
                        User ID: {postDetail?.userId}
                      </Text>
                      <Text style={styles.meta}>Post ID: {postDetail?.id}</Text>
                      <Text style={styles.body}>Body: {postDetail?.body}</Text>
                      <TouchableOpacity
                        style={[
                          styles.buttonClose,
                          styles.button,
                          styles.flexEnd,
                        ]}
                        onPress={closePostDetailModal}>
                        <Text
                          style={[styles.buttonCloseText, styles.buttonText]}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
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
  buttonSave: {
    backgroundColor: 'green',
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
  buttonSaveText: {
    color: 'white',
  },
  editText: {
    fontSize: 20,
    fontWeight: '700',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputField: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  bodyInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
});
