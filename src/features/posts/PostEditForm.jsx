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
        console.error('failed to fetch the post:', e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentPost();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const updatedPost = {
      title: post.title,
      body: post.body
    };

    try {
      const response = await updatePost(id, updatedPost)
      console.log("postEdit::redirect", `/posts/${id}`)
      navigate(`/posts/${id}`)
      // navigate(`/`)
    }
    catch (e) {
      console.error('failed to update the post:', e);
      setError(e);
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
          <label htmlFor="title">Title</label>
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

