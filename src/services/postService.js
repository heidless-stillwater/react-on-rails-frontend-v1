import { POSTS_API_URL, SEARCH_API_URL } from "../constants";

console.log("======= postService.js ===========")
console.log("POSTS_API_URL", POSTS_API_URL);
console.log("SEARCH_API_URL", SEARCH_API_URL);

async function fetchAllPosts() {
  const response = await fetch(`${POSTS_API_URL}`);
  // console.log("fetchAppPosts::response", response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`);
  // console.log("fetchPost::response", response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createPost(postData) {
  console.log("============== createPost::postData ==================");
  console.log("createPost::postData", postData);
  console.log("createPost::POSTS_API_URL", POSTS_API_URL);
  const response = await fetch(POSTS_API_URL, {
    method: 'POST',
    // doesn't need headers because it is formData
    body: postData
  })
  // console.log("response", response);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function updatePost(id, postData) { 
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: 'PUT',
    body: postData
  })

  if (!response.ok) {
    throw new Error('failed to update post: ' + response.statusText);
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${POSTS_API_URL}/${id}`, {
    method: "DELETE",
  });

  // 204 is No Content status
  if (response.status === 204) {
    return null;
  }
  
  throw new Error(response.statusText);
}

async function searchPosts(query, page = 1) {
  // => api/v1/search + /posts/?q=...
  const response = await fetch(
    `${SEARCH_API_URL}/posts/?q=${query}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPost,
  updatePost,
  searchPosts,
};
