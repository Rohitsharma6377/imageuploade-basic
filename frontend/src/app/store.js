import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/category/categorySlice';
import tagReducer from '../features/tag/tagSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    category: categoryReducer,
    tag: tagReducer,
    ui: uiReducer,
  },
});