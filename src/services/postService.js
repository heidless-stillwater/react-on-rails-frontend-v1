import { API_URL } from "../constants";

async function fetchAllPosts() {
  const response = await fetch(`${API_URL}`);
  // console.log("fetchAppPosts::response", response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${API_URL}/${id}`);
  // console.log("fetchPost::response", response);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

async function createPost(postData) {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: postData
  })

  if (!response.ok) {
    throw new Error('failed to update post: ' + response.statusText);
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  // 204 is No Content status
  if (response.status === 204) {
    return null;
  }
  
  throw new Error(response.statusText);
}

export {
  createPost,
  deletePost,
  fetchAllPosts,
  fetchPost,
  updatePost
//  searchPosts,
};
