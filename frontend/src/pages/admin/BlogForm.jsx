import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { createBlog, updateBlog, fetchBlog } from '../../features/blog/blogSlice';
import { fetchCategories } from '../../features/category/categorySlice';
import { fetchTags } from '../../features/tag/tagSlice';
import { Button, Input, Select, Textarea } from '@acertinity/ui';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { blog, status } = useSelector((state) => state.blog);
  const { categories } = useSelector((state) => state.category);
  const { tags } = useSelector((state) => state.tag);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTags());
    if (id) {
      dispatch(fetchBlog(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setCategoryId(blog.category._id);
      setSelectedTags(blog.tags.map((tag) => tag._id));
    }
  }, [id, blog]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      category: categoryId,
      tags: selectedTags,
    };
    if (id) {
      dispatch(updateBlog({ id, blogData }));
    } else {
      dispatch(createBlog(blogData));
    }
    history.push('/admin/blogs');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Blog' : 'Create New Blog'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-4">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />
        </div>
        <div className="mb-4">
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4">
          <Select
            multiple
            value={selectedTags}
            onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, (option) => option.value))}
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Blog'}
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;



// // ... other imports
// import axios from 'axios';

// const BlogForm = () => {
//   // ... other state and effects

//   const [image, setImage] = useState(null);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await axios.post('/api/blogs/upload-image', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setImage(response.data.url);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const blogData = {
//       title,
//       content,
//       category: categoryId,
//       tags: selectedTags,
//       image,
//     };
//     // ... dispatch create or update action
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* ... other form fields */}
//       <div className="mb-4">
//         <Input type="file" onChange={handleImageUpload} accept="image/*" />
//         {image && <img src={image} alt="Uploaded" className="mt-2 max-w-xs" />}
//       </div>
//       <Button type="submit">Save Blog</Button>
//     </form>
//   );
// };

// export default BlogForm;