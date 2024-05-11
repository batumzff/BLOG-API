import React, { useEffect, useState } from "react";
import useAxios from "../Custom-hooks/useAxios";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useBlogData from "../Custom-hooks/useBlogData";
import blogStyle from "./BLOG/blog.module.scss";


const BlogDetails = () => {
  const { getData, getLike } = useBlogData();
  const {user} = useSelector(state=> state.auth)
  console.log(user)
  const [likeInfo, setlikeInfo] = useState()

  const { blogs } = useSelector((state) => state.blog);
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios();
  // const countOfLikes = async () => {


    useEffect(() => {
      getLike()
      getData();
      
    }, [likeInfo]);

    const handleLike = async () => {
      try {
        // Post like
        const like = await axiosWithToken.post(`blogs/${blogId}/postLike`);
        console.log(like)
      setlikeInfo(like)
        // Update like status
        // await getLike();
      } catch (error) {
        console.error("Error occurred while handling like:", error);
        // Handle error (e.g., display error message to the user)
      }
    }
    
    
    
  
  
  
  
 
  
  // console.log(blogId);
  
  const blogDetails = blogs.find((blog) => blog._id == blogId);
  console.log("blogDetails",blogDetails);
  
 console.log(likeInfo)
  
  // console.log(blogs);
  return (
    <div>
      <div>
        <div className={blogStyle["blog-details"]}>
          <h2>{blogDetails?.title}</h2>
          <div className={blogStyle["author-info"]}>
            <img
              className={blogStyle["profile-photo"]}
              src={
                blogDetails?.userId.image[0]
                  ? blogDetails?.userId.image[0]
                  : "https://cdn.pixabay.com/photo/2024/04/03/05/11/ai-generated-8672065_960_720.jpg"
              }
              alt=""
            />
            <span>{blogDetails?.userId.username}</span>
            <span >{blogDetails?.createdAt
                          ? new Date(blogDetails.createdAt).toLocaleString()
                          : ""}</span>
          </div>
          <div >
      <FaHeart className={blogStyle["heart"]} fill={`${blogDetails?.likes.includes(user.id)?"red":""}`} onClick={handleLike}/>
      
      {blogDetails?.totalLikes}
    </div>
          <div>
            <img style={{width:"450px"}} src={blogDetails?.image[0]} alt="" />
          </div>
          <div>{blogDetails?.content}</div>
        </div>
      </div>
      
     </div>
  );
};

export default BlogDetails;
