import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/LOGIN/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";
import Categories from "../Components/CATEGORIES/Categories";
import Blogs from "../Pages/BLOG/Blogs";
import Contact from "../Pages/Contact";
import MyProfile from "../Pages/MyProfile";
import PrivateRouter from "./PrivateRouter";
import NotFound from "../Pages/NotFound";
import BlogDetails from "../Pages/BlogDetails";
import NewBlog from "../Pages/NewBlog";


const AppRouter = () => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="categories" element={<Categories />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="new-blog" element={<NewBlog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="blog-details/:blogId" element={<PrivateRouter />}>
          <Route path="" element={<BlogDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  );
};

export default AppRouter;
