
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  deletePost, 
  fetchAllPosts,
} from "../../services/postService"; 

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState(null);

  // fetch posts from the API
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
        console.error("failed to fetch posts")
      } catch (e) {
        setError("An error occured while fetching posts: " + e.message);
        console.log("An error occured while fetching posts: " + e.message);
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePostHandler = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      // setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    } catch (e) {
      setError("failed to delete post: " + e.message);
      console.log("failed to delete post: " + e.message);
    }
  }
  

  return (
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id} className="post-container">
            <h2>
              <Link to={`/posts/${post.id}`} className="post-title">
                {post.title}
              </Link>
            </h2>
            <div className="post-links">
              <Link to={`/posts/${post.id}/edit`} className="post-links">
                Edit
              </Link>
              {" | "}
              <button onClick={() => deletePostHandler(post.id)} className="post-links">
                Delete
              </button>
            </div>
            </div>
        );
      })}
    </div>
  );
}

export default PostsList;

