import React from 'react'
import useAxios from '../Custom-hooks/useAxios'
import { FaHeart } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const blogId = useParams()
  const {axiosWithToken} = useAxios()
  const handleLike = async () => {
    const like = await axiosWithToken.post(`blogs/${blogId}/postLike`)
    console.log(like)
  }
  return (
    <div>
      <div onClick={handleLike}>
      <FaHeart />
        {blog.countOfLikes}
      </div>
    </div>
  )
}

export default BlogDetails