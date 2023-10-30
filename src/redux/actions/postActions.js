import axios from "axios";
import {
  setPostDetails,
  setPosts,
  setSearchPost,
} from "../reducers/postReducers";

// Function to get all the posts

const token = localStorage.getItem("token");

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPosts(response.data.data));
  } catch (error) {
    console.error("Error:", error);
  }
};

// Function to get the details of a post
export const getPostDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}movie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(setPostDetails(response.data.data));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const searchMovie = (search) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API}search/movie?page=1&query=${search}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setSearchPost(response.data.data));
  } catch (error) {
    console.error("Error:", error);
  }
};
