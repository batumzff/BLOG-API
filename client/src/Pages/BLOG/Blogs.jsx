import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import blogStyle from "./Blog.module.scss";
import { FaEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

const Blogs = () => {
  const { getAllBlogData } = useBlogData();
  const {blogs}  = useSelector((state) => state.blog);

  useEffect(() => {
    getAllBlogData();
  }, []);
  console.log(blogs);
  // const a = Array.from(blogs)
  // console.log(a)

  return (
    
    <>
      {blogs?.map((blog) => (
        <div className={`${blogStyle.container} mt-5`}>
          <div className={blogStyle.row}>
            <div className="col-12">
              <article className={blogStyle["blog-card"]}>
                <div className={blogStyle["blog-card__background"]}>
                  <div className={blogStyle["card__background--wrapper"]}>
                    <div
                      className={blogStyle["card__background--main"]}
                      style={{
                    
                        backgroundImage: `url(${blog?.image})`,
                      }}
                    >
                      <div className={blogStyle["card__background--layer"]} />
                    </div>
                  </div>
                </div>
                <div className={blogStyle["blog-card__head"]}>
                  <span className={blogStyle["date__box"]}>
                    <div>{blog?.title}</div>
                  </span>
                </div>
                <div className={blogStyle["blog-card__info"]}>
                  <div className={blogStyle["blog-info"]}>
                  <FaRegPenToSquare style={{color:'#ffb535' }}/>
                    
                    <h4 className="author">{blog?.userId?.username}</h4>
                    <Link to="#" className={blogStyle["icon-link"]}>
                      
                      <FaEye style={{ color: '#ffb535' }} />
                      <div>{blog?.countOfViews.length}</div>
                      <div>
                        {blog?.createdAt
                          ? new Date(blog.createdAt).toLocaleString()
                          : ""}
                      </div>
                    </Link>
                  </div>
                  <div className={blogStyle["clamped-text"]}>{blog?.content}</div>
                  <Link
                    to={`/blog-details/${blog._id}`} // Assuming blogId is the unique identifier for each blog
                    className={`${blogStyle.btn} ${blogStyle["btn--with-icon"]}`}
                  >
                    <i
                      className={`${blogStyle["btn-icon"]} fa fa-long-arrow-right`}
                    />
                    READ MORE
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      ))}
      
    </>
  );
};

export default Blogs ;

// import React, { useEffect } from "react";
// import useBlogData from "../../Custom-hooks/useBlogData";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import blogStyle from "./Blog.module.scss";

// const Blogs = () => {
//   const { getAllBlogData } = useBlogData();
//   const { blogs } = useSelector((state) => state.blog);
//   useEffect(() => {
//     getAllBlogData();
//   }, []);

//   console.log(blogs);
//   return (
//     <main>
//       <Link to="/new-blog">Add Blog</Link>

//       <section key={Date.now()}>
//         {blogs?.map((blog) => (
//           <main key={blog._id}>
//             <h2>{blog?.title}</h2>
//             <section>
//               <img src={blog?.image[0]} alt="blog-image" />
//             </section>
//             <p className={blogStyle.content}>{blog?.content}</p>
//             <span>likes{blog?.totalLikes}</span>
//             <span>viewed by{Math.floor(Number(blog?.countOfViews.length)) == 0 ? 1 : Math.floor(Number(blog?.countOfViews.length)) }</span>
//             <div>
//               {blog?.createdAt ? new Date(blog.createdAt).toLocaleString() : ""}
//             </div>
//             {/* <div>{blog?.updatedAt
//                 ? new Date(blog.updatedAt).toLocaleString()
//                 : ""}</div> */}
//             <Link to={`/blog-details/${blog._id}`}>
//               <button>Read more</button>
//             </Link>
//           </main>
//         ))}
//       </section>
//     </main>
//   );
// };

// export default Blogs;