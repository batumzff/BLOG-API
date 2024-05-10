import React, { useEffect } from "react";
import useBlogData from "../../Custom-hooks/useBlogData";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import blogStyle from "./blog.module.scss";
import { FaEye } from "react-icons/fa";

const Blogs = () => {
  const { getAllBlogData } = useBlogData();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    getAllBlogData();
  }, []);
  console.log(blogs);

  return (
    <>
      {blogs.map((blog) => (
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
                    {/* <a href="#" className="icon-link mr-3">
                      <i className="fa fa-pencil-square-o" /> Tony Jahson
                    </a> */}
                    <a href="#" className={blogStyle["icon-link"]}>
                      <i className="fa fa-comments-o" />
                      <FaEye />
                      <div>{blog?.countOfViews}</div>
                      <div>
                        {blog?.createdAt
                          ? new Date(blog.createdAt).toLocaleString()
                          : ""}
                      </div>
                    </a>
                  </div>
                  <div>{blog?.content}</div>
                  <Link
                    to={`blog-details/${blog.blogId}`} // Assuming blogId is the unique identifier for each blog
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

export default Blogs;
