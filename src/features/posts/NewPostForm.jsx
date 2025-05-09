import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import PostForm from './PostForm'

function NewPostForm () {
  const navigate = useNavigate()

  const handleCreateSubmit = async (formData) => {
    try {
      const response = await createPost(formData);
      // console.log("NewPostForm::response", response);
      navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("failed to create post: ", e);
    }

  };

  return (
    <PostForm
      headerText="Create a New Post"
      buttonText="Create"
      onSubmit={handleCreateSubmit}
    />
  )
}

export default NewPostForm
