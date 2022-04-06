import React, { FC } from 'react';
import { Button, SxProps, Theme } from '@mui/material';
type PostActionButtonProps = {
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  nums?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ButtonPost: FC<PostActionButtonProps> = ({ sx, startIcon, nums, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        color: '#d5d5d5',
        bgcolor: '#22282c',
        borderRadius: 4,
        transition: 'all 0.3s ease-in-out',
        fontSize: 14,
        py: '2px',
        boxShadow: 0,
        '&:hover': {
          boxShadow: 0,
          bgcolor: 'rgba(153, 158, 163, 0.2)',
        },
        svg: {
          height: '16px',
          width: '16px',
        },
        ...sx,
      }}
      startIcon={startIcon}
      onClick={onClick}
    >
      {nums}
    </Button>
  );
};
