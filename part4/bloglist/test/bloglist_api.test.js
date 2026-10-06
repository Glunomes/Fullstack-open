const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
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

  after(async () => {
    await mongoose.connection.close()
  })

  test('added one blog to array of blogs', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Me',
      url: 'mysite.com',
      likes: 9999,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('Canonical string reduction'))
  })
})