import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'
import PostForm from './PostForm'

function NewPostForm() {
  const navigate = useNavigate()

  const handleCreateSubmit = async (rawData) => {
    // create form data
    // can't just be the rawData
    // needs to be wrapped in a post[field_name] format
    // for example, post[title], post[body], post[image]
    // console.log("NewPostForm::handleCreateSubmit", rawData);
    const formData = new FormData()
    formData.append('post[title]', rawData.title)
    formData.append('post[body]', rawData.body)
    formData.append('post[image]', rawData.image)

    try {
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
