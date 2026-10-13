import { useParams } from 'react-router-dom'

const Blog = ({ blogs, addLike, deleteBlog, user }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if(!blog) {
    return <div>loading...</div>
  }

  const showDeleteButton = blog.user?.username === user?.username

  return (
    <div className='blog'>
      <h2>{blog.author}: {blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes}
        {user && (
          <button onClick={() => addLike(blog)}>like</button>
        )}
      </p>
      <p>Added by {blog.user?.name}</p>
      {showDeleteButton ? (
        <button onClick={() => deleteBlog(blog)}>remove</button>
      ) : null}
    </div>
  )
}

export default Blog
