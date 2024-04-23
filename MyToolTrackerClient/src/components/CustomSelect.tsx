import * as React from 'react';
import {
  FormControl,
  InputLabel,
  FormHelperText,
  Select,
  MenuItem
} from '@mui/material';

interface Props {
  formState: {
    register: any,
    errors: any,
  },
  options: {
    value: number,
    label: string
  }[],
  fieldName: string
  label: string
}

const CustomSelect: React.FC<Props> = ({
  formState: { register, errors },
  options,
  fieldName,
  label,
}) => {

  const menuItems = options.map((option, index) => {
    return (
      <MenuItem key={index} value={option.value}>
        {option.label}
      </MenuItem>
    )
  });

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel
        sx={{ color: errors[fieldName] ? 'red' : '' }}
        id={`select-${fieldName}-label`}
      >
        {label}
      </InputLabel>
      <Select
        {...register(fieldName)}
        labelId={`select-${fieldName}-label`}
        label={label}
        error={errors[fieldName] ? true : false}
        fullWidth
        defaultValue=''
        sx={{ textAlign: 'left' }}
      >
        {menuItems}
      </Select>
      {errors[fieldName] && (
        <FormHelperText sx={{ color: 'red' }}>
          {errors[fieldName].message}
        </FormHelperText>
      )}

    </FormControl>
  );
}

export default CustomSelect;
