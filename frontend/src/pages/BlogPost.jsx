import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlog } from '../features/blog/blogSlice';
import { Card, CardHeader, CardContent, Button } from '@acertinity/ui';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

const BlogPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blog, status, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlog(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  const shareUrl = window.location.href;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">{blog.title}</h1>
          <p className="text-sm text-gray-500 mt-2">
            By {blog.author.name} | Category: {blog.category.name} | Tags: {blog.tags.map((tag) => tag.name).join(', ')}
          </p>
        </CardHeader>
        <CardContent>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Share this post</h3>
            <div className="flex gap-2">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={blog.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;
