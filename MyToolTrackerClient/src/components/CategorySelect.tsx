'use client'

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Category } from '@/types/category';

import { CategoryService } from '@/services/categoryService';
import { useEffect, useState } from 'react';

interface Props {
  formState: {
    register: any,
    errors: any,
  }
}

const categoryService = new CategoryService();

const CategorySelect: React.FC<Props> = ({ formState: { register, errors }}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories
        const categories = await categoryService.getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [])

  const categoryItems = categories.map((category: Category, index: number) => {
    return (
      <MenuItem key={index} value={category.id}>
        { category.name }
      </MenuItem>
    )
  });

  return (
    <FormControl margin="normal" sx={{ minWidth: 120, width: '100%' }}>
      <InputLabel
        sx={{ color: errors.category ? 'red' : '' }}
        id="select-cagegory-label"
      >
        Category
      </InputLabel>
      <Select
        {...register('category')}
        value={selectedCategory || ''}
        onChange={(e) => setSelectedCategory(e.target.value as number)}
        labelId="select-cagegory-label"
        id="category"
        name="category"
        label="Category"
        error={errors.category ? true : false}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        { categoryItems }
      </Select>
      {errors.category && (
        <FormHelperText sx={{ color: 'red' }}>
          {errors.category.message}
        </FormHelperText>
      )}

    </FormControl>
  )
}

export default CategorySelect;
