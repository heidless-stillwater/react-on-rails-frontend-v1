import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  deletePost, 
  fetchPost,
} from "../../services/postService";

function PostDetails() {
  const [ post, setPost ] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const json = await fetchPost(id);
        console.log("json", json);
        setPost(json);
      } catch (e) {
        setError("An error occurred while fetching the post: " + e.message);
        console.log("An error occurred while fetching the post: " + e.message);
      }  
    }
    fetchCurrentPost();
  }, [id]);

  const deletePostHandler = async () => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (e) {
      console.log("An error occurred while deleting the post: " + e.message);
    }
  }

  if (!post) return <h2>Loading Post...</h2>;

  return (
    <div>
      {/* <h1>{console.log("post", post)}</h1> */}

      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/">Back to Posts</Link>
      {" | "}
      <Link to={`/posts/${post.id}/edit`}>Edit</Link>
      {" | "}
      <button onClick={deletePostHandler}>Delete</button>
    </div>
  );
}
export default PostDetails;


