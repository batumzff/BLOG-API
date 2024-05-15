import useAxios from "./useAxios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getAllData,
  getSingleData,
} from "../Features/BlogSlice";

const useBlogData = () => {
  const { axiosWithToken } = useAxios();
  const dispatch = useDispatch();

  const getAllBlogData = async () => {
    dispatch(fetchStart());

    try {
      const [users, categories, blogs, comments] = await Promise.all([
        axiosWithToken("users"),
        axiosWithToken("categories"),
        axiosWithToken("blogs"),
        axiosWithToken("comments"),
      ]);

      dispatch(
        getAllData([
          users?.data?.data,
          categories?.data?.data,
          blogs?.data?.data,
          comments?.data?.data,
        ])
      );
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getData = async (url = "blogs") => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${url}/`);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getLike = async (url,blogId) => {
    console.log(url);
    console.log(blogId);
    dispatch(fetchStart());
    try {
      const { data }  = await axiosWithToken.get(`blogs/${blogId}/getLike`);
      console.log(data);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  }

 const getDetailPage = async (url, blogId) => {
  console.log("********************");
  console.log(url);
  console.log(blogId);
  console.log("********************");

  dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`blogs/${blogId}`);
      console.log("detail data",data);
      dispatch(getSingleData({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
 }

 const getComment = async (url, blogId) => {
  dispatch(fetchStart());
  try {
    const { data } = await axiosWithToken.get(`blogs/${blogId}`);
    console.log("comment-data in getComment",data);
    dispatch(getSingleData({ data, url }));
  } catch (error) {
    dispatch(fetchFail());
    console.log(error);
  }
 }

  return { getAllBlogData, getData, getLike, getDetailPage, getComment };
};

export default useBlogData;
