import React, { useEffect, useState } from "react";
import modalBlogStyle from "./BlogModal.module.scss";
import ReactQuill from "react-quill";
import { modules } from "../../Helpers/quillModules";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import useBlogData from "../../Custom-hooks/useBlogData";
import useAxios from "../../Custom-hooks/useAxios";
import { useNavigate } from "react-router-dom";


const BlogModal = ({
  title,
  image,
  isPublish,
  blogId,
  content,
  categoryId,
  onClose
}) => {
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { axiosWithToken } = useAxios();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [inputs, setInputs] = useState({
    title,
    image,
    categories: "",
    isPublish,
  });
  const [text, setText] = useState(content);

  useEffect(() => {
    getData("categories");
  }, []);

  console.log(categoryId);

  const handleForm = (e) => {
    const { name, value } = e.target;
    const sanitizedContent = DOMPurify.sanitize(text, { USE_PROFILES: { html: true } });
    // const content = sanitizedContent.replace(/<[^>]*>/g, "");
    const content = sanitizedContent
    console.log(content);

    setInputs({
      ...inputs,
      [name]: value,
      content,
    });
  };

  const putBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.put(`${url}/${blogId}`, postData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putBlog("blogs", inputs);
    setInputs({ title: "", image: "", categories: "", isPublish: "" });
    setText("");
    navigate(`/blog-details/${blogId}`);
  };

  const categoryName = (categories?.filter(
    (category) => category._id == categoryId
  ))[0]?.name;

  

  return (
    <main className={modalBlogStyle["modal-main"]}>
      {open && (
        <div className={modalBlogStyle["modal"]}>
          {/* <button onClick={() => setOpen((prev) => !prev)}>X</button> */}

          <form onSubmit={handleSubmit}>
            <div className={modalBlogStyle["input-group"]}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={inputs.title}
                onChange={handleForm}
              />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <ReactQuill
                className={modalBlogStyle.quill}
                theme="snow"
                value={text}
                onChange={setText}
                modules={modules}
              />
            </div>
            <div className={modalBlogStyle["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </div>
            <div className={modalBlogStyle["input-group"]}>
              <select
                key={Date.now()}
                name="categories"
                id="categories"
                value={inputs.categories}
                onChange={handleForm}
              >
                <option value={categoryId}>{categoryName}</option>
                {categories?.map((category) => (
                  <option value={category._id}>
                    {category.name == categoryName ? "" : category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={modalBlogStyle["input-group"]}>
              <select
                name="isPublish"
                id="isPublish"
                value={inputs.isPublish}
                onChange={handleForm}
              >
                <option value="">Select Publish Status</option>
                <option value="true">Publish</option>
                <option value="false">Draft</option>
              </select>
            </div>
            <button>Submit</button>
            <button style={{marginLeft:"1rem", backgroundColor:"#ED0800"}} onClick={()=> onClose(false)}>Close</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default BlogModal;