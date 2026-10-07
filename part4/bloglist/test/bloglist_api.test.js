const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Создаем пользователя, чтобы было к кому привязать создаваемые блоги
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })
  await user.save()

  await Blog.insertMany(helper.initialBlogs)
})

describe('testing HTTP request', () => {
  test('blogs are returned as json with key as "id", not "_id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    assert.ok(response.body[0].id)
    assert.ok(!response.body[0]._id)
  })

  test('added one blog to array of blogs', async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const newBlog = {
      title: 'New Blog',
      author: 'Me',
      url: 'mysite.com',
      likes: 9999,
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('New Blog'))
  })

  test('if "likes" key is missing, default value of this field is 0', async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const newBlog = {
      title: 'New Blog',
      author: 'Me',
      url: 'mysite.com',
      userId: user.id
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('blog without title is not added and return error 400', async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const newBlog = {
      author: 'Me1',
      url: 'mysite1.com',
      likes: 5,
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('blog without url is not added and return error 400', async () => {
    const users = await helper.usersInDb()
    const user = users[0]

    const newBlog = {
      title: 'New Blog2',
      author: 'Me1',
      likes: 6,
      userId: user.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    const contents = blogsAtEnd.map(b => b.title)
    assert(!contents.includes(blogToDelete.title))
  })

  test('a blog post likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = {
      likes: blogToUpdate.likes + 1,
    }

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})