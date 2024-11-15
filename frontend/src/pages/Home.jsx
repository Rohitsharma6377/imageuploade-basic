import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../feature/blog/blogSlice';
import { createSlice } from '@reduxjs/toolkit';

// import { Card, CardHeader, CardContent, Button, Pagination } from '@acertinity/ui';

const Home = () => {
  const dispatch = useDispatch();
  const { blogs, status, error, currentPage, totalPages } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchBlogs(page));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardHeader>
              <Link to={`/blog/${blog._id}`} className="text-xl font-semibold hover:underline">
                {blog.title}
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                By {blog.author.name} | Category: {blog.category.name}
              </p>
              <p className="line-clamp-3">{blog.content.substring(0, 150)}...</p>
              <Link to={`/blog/${blog._id}`}>
                <Button className="mt-4">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
