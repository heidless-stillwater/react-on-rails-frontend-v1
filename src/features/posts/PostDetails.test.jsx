import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import PostDetails from './PostDetails'
import * as postService from '../../services/postService'

jest.mock('../../constants', () => ({
  API_URL: 'http://your-test-api-url',
}))

jest.mock('../../services/postService', () => ({
  fetchPost: jest.fn(),
  deletePost: jest.fn(),
}))

describe('PostDetails component', () => {
  const mockPost = {
    id: 1,
    title: 'Post 1',
    body: 'Hello World',
  }

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/" element={<div>Posts List</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays the fetched post data', async () => {
    postService.fetchPost.mockResolvedValue(mockPost)
    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument()
      expect(screen.getByText(mockPost.body)).toBeInTheDocument()
    })
  })

  it('handles the error when fetching the post fails', async () => {
    const error = new Error('failed to fetch the Post')
    postService.fetchPost.mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()
  })

  it('deletes the post & redirects to the posts list when delete button is clicked', async () => {
    postService.fetchPost.mockResolvedValue(mockPost)
    postService.deletePost.mockResolvedValue()

    renderComponent()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
    })

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
    })
  })

  it('handles error when deleting the post', async () => {
    const error = new Error('failed to delete post')
    postService.fetchPost.mockResolvedValue(mockPost)

    postService.deletePost.mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderComponent()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'))
    })

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('failed to delete post: ', error)
    })
    consoleSpy.mockRestore()
  })
})
