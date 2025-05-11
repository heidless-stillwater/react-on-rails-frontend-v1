import { useState } from 'react'
import PropTypes from 'prop-types'

function PostForm({ post, headerText, buttonText, onSubmit }) {
  const [formData, setFormData] = useState(
    post || {
      title: '',
      body: '',
      image: '',
    }
  )

  return (
    <div>
      <h2>{post ? 'Edit Post' : 'Create Post'}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
              console.log(e.target.files[0])
            }}
          />
        </div>

        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value,
              })
            }
          />
        </div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  headerText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired.isRequired,
}

PostForm.defaultProps = {
  post: null,
  headerText: 'New Post',
  buttonText: 'Create Post',
}

export default PostForm
