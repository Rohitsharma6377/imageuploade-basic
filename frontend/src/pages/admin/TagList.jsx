import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTags, createTag, updateTag, deleteTag } from '../../features/tag/tagSlice';
import { Button, Input, Table } from '@acertinity/ui';

const TagList = () => {
  const dispatch = useDispatch();
  const { tags, status, error }

 = useSelector((state) => state.tag);
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTags());
    }
  }, [status, dispatch]);

  const handleCreate = () => {
    dispatch(createTag({ name: newTag }));
    setNewTag('');
  };

  const handleUpdate = () => {
    dispatch(updateTag({ id: editingTag._id, name: editingTag.name }));
    setEditingTag(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      dispatch(deleteTag(id));
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
      <h1 className="text-3xl font-bold mb-6">Tag List</h1>
      <div className="mb-4 flex">
        <Input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New Tag Name"
          className="mr-2"
        />
        <Button onClick={handleCreate}>Create Tag</Button>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tags.map((tag) => (
            <Table.Row key={tag._id}>
              <Table.Cell>
                {editingTag && editingTag._id === tag._id ? (
                  <Input
                    type="text"
                    value={editingTag.name}
                    onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                  />
                ) : (
                  tag.name
                )}
              </Table.Cell>
              <Table.Cell>
                {editingTag && editingTag._id === tag._id ? (
                  <Button onClick={handleUpdate} className="mr-2">Save</Button>
                ) : (
                  <Button onClick={() => setEditingTag(tag)} className="mr-2">Edit</Button>
                )}
                <Button variant="destructive" onClick={() => handleDelete(tag._id)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TagList;