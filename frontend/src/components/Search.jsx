import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchBlogs } from '../features/blog/blogSlice';
import { Card, CardHeader, CardContent, Input, Button } from '@acertinity/ui';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { blogs, status, error } = useSelector((state) => state.blog);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBlogs(query));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Blogs</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs..."
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>
      {status === 'loading' && <div>Searching...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' && (
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
      )}
    </div>
  );
};

export default Search;
