import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../request'

export const useBlogs = () => {

  const result = useQuery ({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    retry: 2,
  })

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  return {
    blogs: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addBlog: ( blog, option ) => newBlogMutation.mutate({ ...blog, likes: 0 }, option),
    updateVote: ( blog, option ) => {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
        user: blog?.user?._id || blog.user,
      }

      updateBlogMutation.mutate (updatedBlog, option)
    },
    deleteBlog: ( id, option ) => deleteBlogMutation.mutate( id, option)
  }
}