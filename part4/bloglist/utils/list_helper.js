const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((prev,current) => {
    return current.likes > prev.likes ? current : prev
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const counts = _.countBy(blogs, 'author')
  const authors = _.map(counts, (blogs, author) => ({ author, blogs }))
  return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(groupedByAuthor, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
