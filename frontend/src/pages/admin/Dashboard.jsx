import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, Button } from '@acertinity/ui';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Blogs</h2>
          </CardHeader>
          <CardContent>
            <Link to="/admin/blogs">
              <Button>Manage Blogs</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Categories</h2>
          </CardHeader>
          <CardContent>
            <Link to="/admin/categories">
              <Button>Manage Categories</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Tags</h2>
          </CardHeader>
          <CardContent>
            <Link to="/admin/tags">
              <Button>Manage Tags</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;