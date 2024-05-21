import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import useAxios from "../../Custom-hooks/useAxios";
import newBlogStyle from "./NewBlog.module.scss";
import useBlogData from "../../Custom-hooks/useBlogData";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { modules } from "../../Helpers/quillModules";


const NewBlog = () => {
  const { categories } = useSelector((state) => state.blog);
  const { getData } = useBlogData();
  const { axiosWithToken } = useAxios();
  const [inputs, setInputs] = useState({
    title: "",
    image: "",
    categories: "",
    isPublish: "",
  });
  const [text, setText] = useState("");
  // console.log("categories", categories);

  const navigate = useNavigate()

  useEffect(() => {
    getData("categories");
  }, []);

  const handleForm = (e) => {
    const { name, value } = e.target;
    const sanitizedContent = DOMPurify.sanitize(text);
    const content = sanitizedContent.replace(/<[^>]*>/g, "");
    console.log(content);

    setInputs({
      ...inputs,
      [name]: value,
      content,
    });
  };
  console.log(inputs);


  console.log(text);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await postBlog("blogs", inputs);
    setInputs({ title: "", image: "", categories: "", isPublish: "" });
    setText("");
    navigate("/blogs")
  };

  const postBlog = async (url, postData) => {
    try {
      const { data } = await axiosWithToken.post(`${url}/`, postData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={newBlogStyle["new-blog-main"]}>
      <main className={newBlogStyle["form-container"]}>
        <section>
          <form onSubmit={handleSubmit}>
            <div className={newBlogStyle["input-group"]}>
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
                className={newBlogStyle.quill}
                theme="snow"
                value={text}
                onChange={setText}
                modules={modules}
              />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <label htmlFor="image">Image Url</label>
              <input
                type="text"
                id="image"
                name="image"
                value={inputs.image}
                onChange={handleForm}
              />
            </div>
            <div className={newBlogStyle["input-group"]}>
              <select
                key={Date.now()}
                name="categories"
                id="categories"
                value={inputs.categories}
                // style={{ width: "100px" }}
                onChange={handleForm}
              >
                <option>Select Category</option>
                {categories?.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className={newBlogStyle["input-group"]}>
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
          </form>
        </section>
      </main>
    </section>
  );
};

export default NewBlog;