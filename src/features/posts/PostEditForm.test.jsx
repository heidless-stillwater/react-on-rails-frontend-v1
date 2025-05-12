import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder

// standard imports

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act } from 'react'

// custom
import PostEditForm from './PostEditForm'
import { fetchPost, updatePost } from '../../services/postService'

jest.mock('../../services/postService', () => ({
  fetchPost: jest.fn(),
  updatePost: jest.fn(),
}))

describe('PostEditForm', () => {
  const mockPost = {
    id: 1,
    title: 'New Post Title',
    body: 'New Post Body',
  }

  const renderForm = () => {
    render(
      <MemoryRouter initialEntries={['/posts/1/edit']}>
        <Routes>
          <Route path="/posts/:id/edit" element={<PostEditForm />} />
          <Route path="/posts/:id" element={<h1>Post Detail</h1>} />
        </Routes>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    fetchPost.mockResolvedValue(mockPost)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the PostEditForm component', async () => {
    renderForm()

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1)
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument()
      expect(screen.getByDisplayValue(mockPost.body)).toBeInTheDocument()
    })
  })

  it('successfully updates the post and redirects', async () => {
    renderForm()

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1)
    })

    const newPost = {
      id: 1,
      title: 'New Post Title',
      body: 'New Post Body',
    }

    // const formData = objectToFormData({ post: newPost });

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    })

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: newPost.title },
    })

    fireEvent.change(screen.getByLabelText(/Body/i), {
      target: { value: newPost.body },
    })

    await act(async () => {
      fireEvent.click(screen.getByText(/Update Post/i))
    })

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledTimes(1)
      // expect(updatePost).toHaveBeenCalledWith("1", newPost);
    })

    expect(screen.getByText(/Post Detail/i)).toBeInTheDocument()
  })

  it('show a console error on update failure', async () => {
    updatePost.mockRejectedValue(new Error('update failed'))

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderForm()

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Update Post/i))
    })

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledTimes(1)
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      'failed to update the post:',
      Error('update failed')
    )
  })

  it('handle error when failing to fetch the post', async () => {
    const error = new Error('fetch failed')
    fetchPost.mockRejectedValue(error)

    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(jest.fn())

    renderForm()

    await waitFor(() => {
      expect(fetchPost).toHaveBeenCalledTimes(1)
    })

    expect(consoleSpy).toHaveBeenCalledWith('failed to fetch the post:', error)
  })
})
