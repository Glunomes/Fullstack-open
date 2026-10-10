import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, showDeleteButton }) => {
  const [visibility, setVisibility] = useState(false)

  const changeVisibility = () => {
    setVisibility(!visibility)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title} - {blog.author}</span>
        <button onClick={changeVisibility}>
          {visibility ? 'hide' : 'show'}
        </button>
      </div>

      {visibility && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button onClick={() => addLike(blog)}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {showDeleteButton ? (<button onClick={() => deleteBlog(blog)}>remove</button>) : null}
        </div>
      )}
    </div>
  )

}

export default Blog