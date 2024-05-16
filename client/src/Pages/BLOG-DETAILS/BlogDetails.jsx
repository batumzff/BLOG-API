import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useBlogData from "../../Custom-hooks/useBlogData";
import { LiaHeart } from "react-icons/lia";
import { FaTrashAlt } from "react-icons/fa";
import detailStyle from "./BlogDetails.module.scss";
import useAxios from "../../Custom-hooks/useAxios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { VscEdit } from "react-icons/vsc";
import BlogModal from "../../Components/BLOG-MODAL/BlogModal";

const BlogDetails = () => {
  const { blogDetail } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.auth);
  const [likeStatus, setLikeStatus] = useState("");
  const { getLike, getDetailPage, getComment } = useBlogData();
  const { blogId } = useParams();
  const { axiosWithToken } = useAxios();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [editBlogModal, setEditBlogModal] = useState(false);

  
 
  
  // console.log(blogDetail);
  // console.log("comments",comments)
  useEffect(() => {
    getDetailPage("blogDetail", blogId);
    getLike("blogs", blogId);
  }, [likeStatus]);
  // console.log(blogId);
  const postLike = async () => {
    try {
      const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
      // console.log(data);
      setLikeStatus(data);
    } catch (error) {
      console.log("postLike error", error);
    }
  };

  const handleComment = async () => {
    const sanitizedContent = DOMPurify.sanitize(comment);
    const content = sanitizedContent.replace(/<[^>]*>/g, "");
    try {
      const data = await axiosWithToken.post("comments", {
        // userId: user.userId,
        content,
        blogId,
      })
      // console.log("comment-data",data);
    } catch (error) {
      console.log(error);
    }
  }
  // const deneme = comments?.map(comment=>comment?.content)
  // console.log(deneme)

  useEffect(() => {
   getComment("comments",blogId)
   
  }, [comment])
  
  // console.log(token);
// console.log(blogDetail?.countOfViews);
  let visitorCount = blogDetail?.countOfViews?.length;
  visitorCount = visitorCount == 0 ? 1 : visitorCount;
  // console.log(show);
  // console.log(likes)

  const categoryId = blogDetail?.categoryId
  // console.log(categoryId)
  
  
  console.log(blogDetail)

  
 
  return (
    <main>
      <section>
        <div className={detailStyle["detail-header"]}>
          <h2>{blogDetail?.title}</h2>
          <div>
            <img src={blogDetail?.image} alt="blog-image" />
            <div>
              <LiaHeart
                onClick={postLike}
                fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
              />
            </div>
            <span>{blogDetail?.totalLikes}</span>
            {
              visitorCount && (
              <h4>
                viewed by <span>{visitorCount} </span>
                <span>
                  {visitorCount > 1 ? "people" : "person"}
                </span>
              </h4>)
            }
            
            {blogDetail?.userId?._id == user?.id && (
              <span className={detailStyle.modal}>
                {/* <FaTrashAlt /> */}
                <VscEdit onClick={()=>setEditBlogModal(!editBlogModal)}/>
              </span>
            )}
            <p>{blogDetail?.content}</p>
          </div>
        </div>
        <button onClick={() => setShow((prev) => !prev)}>Show comments</button>
        {show && (
          <div className={detailStyle.comment} >
            {/* <h4>{comments?.userId.username}</h4> */}
            {blogDetail?.comments?.length > 0 ? (
              blogDetail?.comments?.map((comment) => (
                <div key={comment?._id}>
                  <div >{comment?.content}</div>
                </div>
                
              ))
            ) : (
              <div>
                <h4>Add first comment</h4>
                
                
              </div>
            )}
          </div>
        )}
        { show && <div>
          <ReactQuill
                  // className={newBlogStyle.quill}
                  theme="snow"
                  value={comment}
                  onChange={setComment}
                />
                <button onClick={handleComment}>Add Your Comment</button>
        </div> }
      </section>
      {
        editBlogModal && <BlogModal {...blogDetail} blogId={blogId} categoryId={categoryId} />
      }
      
    </main>
  );
};


export default BlogDetails;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import useBlogData from "../../Custom-hooks/useBlogData";
// import { LiaHeart } from "react-icons/lia";
// import { FaTrashAlt } from "react-icons/fa";
// import detailStyle from "./BlogDetails.module.scss";
// import useAxios from "../../Custom-hooks/useAxios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import DOMPurify from "dompurify";

// const BlogDetails = () => {
//   const { blogDetail, comments:{ comments} } = useSelector((state) => state.blog);
//   const { user, token } = useSelector((state) => state.auth);
//   const [likeStatus, setLikeStatus] = useState("");
//   const { getLike, getDetailPage, getComment } = useBlogData();
//   const { blogId } = useParams();
//   const { axiosWithToken } = useAxios();
//   const [show, setShow] = useState(false);
//   const [comment, setComment] = useState("");


//   ;
//   console.log(blogDetail);
//   console.log(comments);
//   const a = comments?.map(comment => comment.content)
//   console.log(a);
//   useEffect(() => {
//     getDetailPage("blogDetail", blogId);
//     getLike("blogs", blogId);
//   }, [likeStatus]);
//   // console.log(blogId);
//   const postLike = async () => {
//     try {
//       const data = await axiosWithToken.post(`blogs/${blogId}/postLike`);
//       console.log(data);
//       setLikeStatus(data);
//     } catch (error) {
//       console.log("postLike error", error);
//     }
//   };

//   const handleComment = async () => {
//     const sanitizedContent = DOMPurify.sanitize(comment);
//     const content = sanitizedContent.replace(/<[^>]*>/g, "");
//     try {
//       const data = await axiosWithToken.post("comments", {content, blogId})
//       // console.log("comment-data",data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//    getComment("comments",blogId)
//   }, [comment])
//   console.log(token);
// console.log(blogDetail?.countOfViews);
//   let visitorCount = blogDetail?.countOfViews?.length;
//   visitorCount = visitorCount == 0 ? 1 : visitorCount;
//   console.log(show);
//   // console.log(likes)
//   return (
//     <main>
//       <section>
//         <div className={detailStyle["detail-header"]}>
//           <h2>{blogDetail?.title}</h2>
//           <div>
//             <img src={blogDetail?.image} alt="blog-image" />
//             <div>
//               <LiaHeart
//                 onClick={postLike}
//                 fill={`${blogDetail?.likes?.includes(user?.id) ? "red" : ""}`}
//               />
//             </div>
//             <span>{blogDetail?.totalLikes}</span>
//             <h4>
//               viewed by <span>{visitorCount} </span>
//               <span>
//                 {visitorCount > 1 ? "people" : "person"}
//               </span>
//             </h4>
//             {blogDetail?.userId == user?.id && (
//               <span>
//                 <FaTrashAlt />
//               </span>
//             )}
//             <p>{blogDetail?.content}</p>
//           </div>
//         </div>
//         <button onClick={() => setShow((prev) => !prev)}>Show comments</button>
//         {show && (
//           <div className={detailStyle.comment}>
//             {blogDetail?.comments?.length > 0 ? (
//               blogDetail?.comments?.map((comment) => (
//                 <span key={comment?._id}>{comment?.content}</span>
//               ))
//             ) : (
//               <div>
//                 <h4>Add first comment</h4>
//               </div>
//             )}
//           </div>
//         )}
//         { show && <div>
//           <ReactQuill
//                   // className={newBlogStyle.quill}
//                   theme="snow"
//                   value={comment}
//                   onChange={setComment}
//                 />
//                 <button onClick={handleComment}>Add Your Comment</button>
//         </div> }
//       </section>
//     </main>
//   );
// };

// export default BlogDetails;