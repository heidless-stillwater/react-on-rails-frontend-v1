import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { deletePost, fetchPost } from '../../services/postService'

import '../../assets/stylesheets//PostImage.css'

function PostDetails() {
  const [post, setPost] = useState(null)
  const { id } = useParams()
  const [, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id)
        // console.log("json", json);
        setPost(json)
      } catch (e) {
        setError('failed to fetch the Post: ' + e)
        // console.log("failed to fetch the Post: " + e);
      }
    }
    fetchCurrentPost()
  }, [id])

  const deletePostHandler = async () => {
    try {
      await deletePost(id)
      navigate('/')
    } catch (error) {
      console.error('failed to delete post: ', error)
      setError('failed to delete post: ', error)
    }
  }

  if (!post) return <h2>Loading Post...</h2>

  return (
    <div>
      {/* <h1>{console.log("post", post)}</h1> */}
      <h2>{post.title}</h2>
      <img src={post.image_url} alt={post.title} className="post-image" />
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>
      {' | '}
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {' | '}
      <button onClick={deletePostHandler}>Delete</button>
    </div>
  )
}
export default PostDetails
