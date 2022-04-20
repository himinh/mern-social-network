import { Button, FormControl, InputAdornment, InputBase } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

export const FormInputSearch: FC<FormInputProps> = ({ control, name, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
        <>
          <FormControl
            sx={{ border: '1px solid #38444d', borderRadius: 25, width: '100%' }}
            variant="standard"
          >
            <Input
              onChange={onChange}
              value={value}
              fullWidth
              placeholder="Enter name or post..."
              sx={{ ...rest }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    disabled={!isDirty}
                    size="small"
                    type="submit"
                    sx={{
                      color: '#f91880',
                      borderRadius: 25,
                      cursor: 'pointer',
                      '&:disabled': {
                        color: '#999ea3',
                      },
                    }}
                  >
                    <SearchIcon />
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      )}
    />
  );
};

const Input = styled(InputBase)(() => ({
  fontSize: 16,
  '& .MuiInputBase-input': {
    borderRadius: 50,
    position: 'relative',
    padding: '8px 20px 8px 20px',
    color: '#f21980',
    '&::-webkit-input-placeholder': {
      color: 'white',
    },
  },
}));