import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../features/category/categorySlice';
import { Button, Input, Table } from '@acertinity/ui';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.category);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleCreate = () => {
    dispatch(createCategory({ name: newCategory }));
    setNewCategory('');
  };

  const handleUpdate = () => {
    dispatch(updateCategory({ id: editingCategory._id, name: editingCategory.name }));
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Category List</h1>
      <div className="mb-4 flex">
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category Name"
          className="mr-2"
        />
        <Button onClick={handleCreate}>Create Category</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {categories.map((category) => (
            <Table.Row key={category._id}>
              <Table.Cell>
                {editingCategory && editingCategory._id === category._id ? (
                  <Input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                ) : (
                  category.name
                )}
              </Table.Cell>
              <Table.Cell>
                {editingCategory && editingCategory._id === category._id ? (
                  <Button onClick={handleUpdate} className="mr-2">Save</Button>
                ) : (
                  <Button onClick={() => setEditingCategory(category)} className="mr-2">Edit</Button>
                )}
                <Button variant="destructive" onClick={() => handleDelete(category._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default CategoryList;