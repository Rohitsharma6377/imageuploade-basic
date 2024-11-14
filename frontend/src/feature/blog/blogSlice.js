import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchBlogs = createAsyncThunk('blog/searchBlogs', async (query) => {
  const response = await axios.get(`/api/blogs/search?query=${query}`);
  return response.data;
});

// Add this to the extraReducers:
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default blogSlice.reducer;
