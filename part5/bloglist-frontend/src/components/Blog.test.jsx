import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

  const likesElement = screen.queryByText('35')
  expect(likesElement).toBeNull()
})

test('show URL and likes fields after pressing the button', async () => {

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

  const urlElement = screen.queryByText('me.com')
  expect(urlElement).toBeNull()

  const likesElement = screen.queryByText('35')
  expect(likesElement).toBeNull()

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  expect(screen.getByText('me.com')).toBeDefined()
  expect(screen.getByText('35')).toBeDefined()
})
