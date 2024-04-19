// src/features/categories/CategoryManagement.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useAppSelector } from '../redux/hooks';
import { getCategories, createCategory, deleteCategory } from '../redux/slices/categorySlice';
import { Button, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,Box, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category } from '../types/category';

const CategoryManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector((state) => state.category);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCreate = () => {
    if (newCategoryName) {
      dispatch(createCategory({ name: newCategoryName }))
        .unwrap()
        .then(() => {
          setNewCategoryName('');  // Reset input field
          dispatch(getCategories());  // Refetch categories
        })
        .catch((error) => console.error('Creation failed:', error));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => {
        dispatch(getCategories());  // Refetch categories
      })
      .catch((error) => console.error('Deletion failed:', error));
  };

  return (
    <Box sx={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <Stack spacing={2}>
        <TextField
          fullWidth
          label="New Category Name"
          variant="outlined"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button
          fullWidth
          onClick={handleCreate}
          color="primary"
          variant="contained"
        >
          Create Category
        </Button>
      </Stack>
      <List sx={{ marginTop: '1rem' }}>
        {categories.map((category: Category) => (
          <ListItem key={category.id} divider>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(category.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>

  );
};


export default CategoryManagement;
