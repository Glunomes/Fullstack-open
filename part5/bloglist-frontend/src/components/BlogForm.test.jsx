import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm component updates parent state and calls onSubmit event handler', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByLabelText('title:')
  const inputAuthor = screen.getByLabelText('author:')
  const inputURL = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'How to become Me')
  await user.type(inputAuthor, 'Amazing Me')
  await user.type(inputURL, 'me.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'How to become Me',
    author: 'Amazing Me',
    url: 'me.com'
  })
})