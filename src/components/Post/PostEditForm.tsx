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
import { Post } from '@/src/model/post.model';
import { EditPostFormProps } from '@/src/props/post.prop';
import { editPost, getPostById } from '@/src/services/post.services';


const PostEditForm = ({
  postId,
  showPostEditForm,
  closeEditPostForm,
  onEditSuccess,
}: EditPostFormProps) => {
  const [postDetail, setPostDetail] = useState<Post>();
  const [isReady, setIsReady] = useState<boolean>(false);

  const changeInput = (field: keyof Post, value: string) => {
    setPostDetail((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleEditPost = async () => {
    try {
      await editPost(postDetail);
      closeEditPostForm();
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
          visible={showPostEditForm}
          animationType="fade"
          transparent={true}
          onRequestClose={closeEditPostForm}>
          <TouchableWithoutFeedback onPress={closeEditPostForm}>
            <View style={styles.container}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.editText}>Edit</Text>
                  <View>
                    <Text style={styles.meta}>
                      User ID: {postDetail.userId}
                    </Text>
                    <Text style={styles.meta}>Post ID: {postDetail.id}</Text>

                    <View style={styles.inputContainer}>
                      <View style={styles.inputField}>
                        <Text style={styles.label}>Title:</Text>
                        <TextInput
                          style={styles.input}
                          value={postDetail.title}
                          multiline={true}
                          onChangeText={(text) => changeInput('title', text)}
                        />
                        
                      </View>
                      <View style={styles.inputField}>
                        <Text style={styles.label}>Body:</Text>
                        <TextInput
                          style={[styles.input, styles.bodyInput]}
                          value={postDetail.body}
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
                        onPress={closeEditPostForm}>
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
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
};

export default PostEditForm;

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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});
