import Blog from './Blog'

const BlogList = ({ blogs, addLike, deleteBlog, user }) => {

  return (
    <div>
      <h2>blogs</h2>
      {
        [...blogs]
          .sort((a,b) => b.likes - a.likes)
          .map(blog => {
            return <Blog key={blog.id}
              blog={blog} addLike={addLike} deleteBlog={deleteBlog}
              showDeleteButton={blog.user?.username === user?.username}
            />
          })}
    </div>
  )
}

export default BlogList