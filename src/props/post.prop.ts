export type PostDetailModalProps = {
  postId: number;
  showPostDetail: boolean;
  closePostDetailModal: () => void;
};

export type EditPostFormProps = {
  postId: number;
  showPostEditForm: boolean;
  closeEditPostForm: () => void;
  onEditSuccess: () => void;
};
