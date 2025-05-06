import { Route, Routes } from 'react-router-dom'

import NewPostForm from '../features/posts/NewPostForm'
import PostEditForm from '../features/posts/PostEditForm'
import PostsList from '../features/posts/PostsList'
import PostDetails from '../features/posts/PostDetails'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/new" element={<NewPostForm/>} />
      <Route path="/posts/:id" element={<PostDetails/>} />
      <Route path="/posts/:id/edit" element={<PostEditForm/>} />
      <Route path="*" element={<h2>404 Not Found</h2>} />
    </Routes>
  )
}

export default AppRoutes
