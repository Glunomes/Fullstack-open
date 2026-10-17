const baseUrl = '/api/blogs'

export const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    return `Bearer ${user.token}`
  }
  return null
}

export const getBlogs = async () => {
  const response = await fetch(baseUrl)
  const data = await response.json()
  if(!response.ok) {
    throw new Error(data.error || 'failed to fetch blogs')
  }
  return data
}


export const createBlog = async (blog) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(blog)
  }

  const response = await fetch(baseUrl, options)
  const data = await response.json()
  if(!response.ok) {
    throw new Error(data.error || 'failed to create blogs')
  }
  return data
}

export const updateBlog = async (updatedBlog) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    },
    body: JSON.stringify(updatedBlog)
  }

  const response = await fetch(`${baseUrl}/${updatedBlog.id}`, options)
  const data = await response.json()
  if(!response.ok) {
    throw new Error(data.error || 'failed to update blog')
  }
  return data
}

export const deleteBlog = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Authorization': getToken() }
  }

  const response = await fetch(`${baseUrl}/${id}`, options)
  if(!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'failed to delete blog')
  }
  return response.status
}

