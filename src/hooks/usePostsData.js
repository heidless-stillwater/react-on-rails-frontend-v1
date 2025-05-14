import { useState, useEffect } from 'react';
import { fetchAllPosts, searchPosts } from '../services/postService';

function usePostsData(searchTerm, page = 1) {  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default value, adjust as needed

  useEffect(() => {
    async function loadPosts() {
      try {
        let data;
        if (searchTerm) {
          // console.log('WITH searchTerm:', searchTerm);
          data = await searchPosts(searchTerm, page);
        } else {
          // console.log('WITHOUT searchTerm:', searchTerm);
          data = await fetchAllPosts(page);
        }
        // console.log('TST searchTerm:', searchTerm);
        console.log('data:', data);

        if (data.posts) {
          console.log('Fetched posts:', data.posts.length);
          setPosts(data.posts);
          setTotalPosts(data.total_count);
          setPerPage(data.per_page);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
        console.error('failed to fetch posts:', e);
      }
    }
    loadPosts();
  }, [searchTerm, page]);

  return { posts, loading, error, totalPosts, perPage };
}

export default usePostsData;
