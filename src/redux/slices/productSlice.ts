import { createSlice } from "@reduxjs/toolkit";
import { VideoType } from "../../types";

interface initialStateI {
  videos: null | VideoType[];
  isLoading: boolean,
  error: null | string,
  comments: null | string
}

const initialState: initialStateI = {
  isLoading: false,
  error: null,
  videos: null,
  comments: null
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setComments: (state, action) => {
      state.comments = action.payload
    }
  },
});

export const { setVideos, setError, setIsLoading, setComments } = productSlice.actions;
export default productSlice.reducer;
