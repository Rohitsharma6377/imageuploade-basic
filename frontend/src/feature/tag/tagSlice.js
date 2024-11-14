import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTags = createAsyncThunk('tag/fetchTags', async () => {
  const response = await axios.get('/api/tags');
  return response.data;
});

export const createTag = createAsyncThunk('tag/createTag', async (tagData) => {
  const response = await axios.post('/api/tags', tagData);
  return response.data;
});

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      });
  },
});

export default tagSlice.reducer;