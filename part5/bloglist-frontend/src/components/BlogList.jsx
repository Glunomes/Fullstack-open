import Blog from "./Blog";

const BlogList = ({ blogs, addLike }) => {

  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {sortedBlogs.map(blog => {
        return <Blog key={blog.id} blog={blog} addLike={addLike} />;
      })}
    </div>
  );
};

export default BlogList