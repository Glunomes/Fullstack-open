import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content, but not show url and likes by default', () => {
  const blog = {
    title: 'How to Become Me',
    author: 'Me',
    url: 'me.com',
    likes: 35,
    user: {
      name: 'Not me'
    }
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/How to Become Me/i)).toBeDefined()
  expect(screen.getByText(/Me/i)).toBeDefined()

  const urlElement = screen.queryByText('me.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText(/likes 35/i)
  expect(likesElement).toBeNull()
})