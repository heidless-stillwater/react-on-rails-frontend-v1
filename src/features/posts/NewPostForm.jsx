import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import PostForm from './PostForm'
import { object } from 'prop-types'
import { objectToFormData } from '../../utils/formDataHelper'

function NewPostForm() {
  const navigate = useNavigate()

  const handleCreateSubmit = async (rawData) => {
    try {
      const formData = objectToFormData({ post: rawData })
      const response = await createPost(formData)
      // console.log("NewPostForm::response", response);
      navigate(`/posts/${response.id}`)
    } catch (e) {
      console.error('failed to create post: ', e)
    }
  }

  return (
    <PostForm
      headerText="Create a New Post"
      buttonText="Create"
      onSubmit={handleCreateSubmit}
    />
  )
}

// Comment here

export default NewPostForm
