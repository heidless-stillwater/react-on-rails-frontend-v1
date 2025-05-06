import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPost, updatePost } from '../../services/postService'

function PostEditForm () {
  const [post, setPost ] = useState(null)
  const { id } = useParams()
  const [loading, setLoading ] = useState(true)
  const [, setError ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id)
        setPost(json)
      } catch (e) {
        setError('An error occurred while fetching the post: ' + e.message)
        console.log('An error occurred while fetching the post: ' + e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrentPost()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const updatedPost = {
      title: post.title,
      body: post.body
    };

    try {
      const response = await updatePost(id, updatedPost)
      console.log("response", response)
      navigate(`/posts/${id}`)
    }
    catch (e) {
      setError('An error occurred while updating the post: ' + e.message)
      console.error('An error occurred while updating the post: ' + e.message)
    }
  }
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <br />
          <input
            type="text"
            id="title"
            name="title"
            value={post ? post.title : ''}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            value={post ? post.body : ''}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
      
    </div>
  )
}

export default PostEditForm

