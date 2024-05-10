import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAxios from "../Custom-hooks/useAxios";

const NewBlog = () => {
  const { categories } = useSelector(state => state.blog)
  const { axiosWithToken } = useAxios()
  const [inputs, setInputs] = useState({
    title:"",
    content: "",
    image: "",
    // categories: "",
    categoryId: "",
    isPublish: ""
  })
  console.log("categories", categories);

 const handleForm = (e) => {
  
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value
    })
  }
  console.log(inputs);


  const handleSubmit = async (e) => {
    e.preventDefault()
  await postBlog("blogs",inputs)
  setInputs({
    title:"",
    content: "",
    image: "",
    // categories: "",
    categoryId: "",
    isPublish: ""
  })
    };
 
    const postBlog = async (url, postData) => {
      try {
        const { data } = await axiosWithToken.post(`${url}/`, postData);
        console.log(data);
      } catch (error) {
        // console.log(error);
        console.error("POST request error:", error.response || error.message);
      }
    }
  
 
  return (
    <section>
      <main>
        <section>
          <form onSubmit={handleSubmit}>
            <div>
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
              <input 
              type="text" 
              id="content" 
              name="content" 
              value={inputs.content}
              onChange={handleForm}
              />
            </div>
            <div>
              <label htmlFor="image">Image Url</label>
              <input 
              type="text" 
              id="image" 
              name="image" 
              value={inputs.image} 
              onChange={handleForm}
              />
            </div>
            <div>
            <select 
            name="categoryId" 
            id="categories" 
            value={inputs.categoryId} 
            style={{width:"100px"}}
            onChange={handleForm}
            >
              { categories?.map(category => (

              <option value={category._id}>{ category.name }</option>
              ))}
            </select>
            </div>
            <div>
              <select 
              name="isPublish" 
              id="isPublish" 
              value={inputs.isPublish}
              onChange={handleForm}
              >
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
