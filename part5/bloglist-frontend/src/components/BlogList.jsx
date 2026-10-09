import Blog from "./Blog";

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};

export default BlogList