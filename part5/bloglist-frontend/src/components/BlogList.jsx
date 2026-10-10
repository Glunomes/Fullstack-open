import Blog from "./Blog";

const BlogList = ({ blogs, addLike }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} addLike={addLike} />;
      })}
    </div>
  );
};

export default BlogList