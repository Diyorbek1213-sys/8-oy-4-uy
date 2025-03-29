import { createSlice } from "@reduxjs/toolkit";
import { CommentType, VideoType } from "../../types";

interface CommentsState {
  total_number_of_comments: number;
  comments: CommentType[];
}

interface initialStateI {
  videos: null | VideoType[];
  isLoading: boolean;
  error: null | string;
  comments: CommentsState;
}

const initialState: initialStateI = {
  isLoading: false,
  error: null,
  videos: null,
  comments: { total_number_of_comments: 0, comments: [] },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setComments: (state, action) => {
      state.comments = {
        total_number_of_comments: action.payload.total_number_of_comments,
        comments: action.payload.comments,
      };
    },
  },
});

export const { setVideos, setError, setIsLoading, setComments } = productSlice.actions;
export default productSlice.reducer;
