import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../services/postService'

function NewPostForm () {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const postData = {title, body}

    try {
      const response = await createPost(postData);
      // console.log("NewPostForm::response", response);
      navigate(`/posts/${response.id}`);
    } catch (e) {
      console.error("failed to create post: ", e);
    }

  };

  return (
    <div>
      <h2>New Post</h2>
      {/* <h3>{console.log(`NewPostForm: API_URL: ${API_URL}`)}</h3> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titleInput">Title:</label>
          <input 
            id="titleInput" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body:</label>
          <textarea
            id="bodyInput" 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            placeholder="Body"
          />
        </div>
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm
