import { useState } from "react"

const Blog = ({ blog }) => {
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
          {visibility ? "hide" : "show"}
        </button>
      </div>

      {visibility && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button>like</button>
          </p>
          <p>{blog.user?.name}</p>
        </div>
      )}
    </div>
  )

}

export default Blog