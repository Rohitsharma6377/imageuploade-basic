import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../feature/blog/blogSlice';
import authReducer from '../feature/auth/authSlice';
import categoryReducer from '../feature/category/categorySlice';
import tagReducer from '../feature/tag/tagSlice';
import uiReducer from '../feature/ui/uiSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    auth: authReducer,
    category: categoryReducer,
    tag: tagReducer,
    ui: uiReducer,
  },
});