import { render, fireEvent } from '@testing-library/react'
import { act } from 'react'
import PostForm from './PostForm'

describe('PostForm Component', () => {
  it('renders default inputs when no prop is passed', () => {
    const mockSubmit = jest.fn()
    const buttonText = 'Submit'
    const getByLabelText = render(
      <PostForm
        headerText="New Post"
        onSubmit={mockSubmit}
        buttonText={buttonText}
      />
    )
    expect(getByLabelText.getByLabelText(/title/i)).toBeInTheDocument()
    expect(getByLabelText.getByLabelText(/body/i)).toBeInTheDocument()
  })

  it('renders default inputs when no prop is passed', () => {
    const mockPost = {
      title: 'Test Post',
      body: 'This is a test post',
    }
    const mockSubmit = jest.fn()
    const buttonText = 'Submit'
    const { getByLabelText } = render(
      <PostForm
        post={mockPost}
        headerText="Edit Post"
        onSubmit={mockSubmit}
        buttonText={buttonText}
      />
    )

    expect(getByLabelText(/title/i).value).toBe(mockPost.title)
    expect(getByLabelText(/body/i).value).toBe(mockPost.body)
    expect(getByLabelText(/title/i)).toBeInTheDocument()
    expect(getByLabelText(/body/i)).toBeInTheDocument()
  })

  it('updates the input value n change', () => {
    const mockPost = {
      title: 'Test Post',
      body: 'This is a test post',
    }
    const mockSubmit = jest.fn()
    const buttonText = 'Submit'
    const { getByLabelText, getByText } = render(
      <PostForm
        post={mockPost}
        headerText="Edit Post"
        onSubmit={mockSubmit}
        buttonText={buttonText}
      />
    )

    const newTitle = 'New Title'
    const newBody = 'New Body'

    fireEvent.change(getByLabelText(/title/i), {
      target: { value: newTitle },
    })
    fireEvent.change(getByLabelText(/body/i), { target: { value: newBody } })
    fireEvent.click(getByText(buttonText))

    expect(mockSubmit).toHaveBeenCalledWith({
      title: newTitle,
      body: newBody,
    })
  })

  it('calls onSubmit when the form submitted', async () => {
    const mockPost = {
      title: 'Test Post',
      body: 'This is a test post',
    }
    const mockSubmit = jest.fn()
    const buttonText = 'Submit'
    const headerText = 'Edit Post'

    const { getByLabelText, getByRole } = render(
      <PostForm
        post={mockPost}
        headerText={headerText}
        onSubmit={mockSubmit}
        buttonText={buttonText}
      />
    )

    const titleInput = getByLabelText(/title/i)
    const bodyInput = getByLabelText(/body/i)
    const newTitle = 'Test Post'
    const newBody = 'This is a test post'

    fireEvent.change(titleInput, { target: { value: newTitle } })
    fireEvent.change(bodyInput, { target: { value: newBody } })

    await act(async () => {
      fireEvent.click(getByRole('button', { name: /submit/i }))
    })

    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith({
      title: newTitle,
      body: newBody,
    })
  })
})
