import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { limitPosts } from 'contants/pagination';

type Props = {
  isFetching: boolean;
  totalResults: number;
  limit: number;
  onChangeLimit: (limit: number) => void;
};

export const LoadMoreButton = ({ isFetching, totalResults, limit, onChangeLimit }: Props) => {
  return (
    <Box mb={3} sx={{ display: 'flex', justifyContent: 'center' }}>
      {isFetching ? (
        <CircularProgress size={25} />
      ) : totalResults > limit ? (
        <Button sx={{ textTransform: 'capitalize' }} onClick={() => onChangeLimit(limit + 2)}>
          Load more
        </Button>
      ) : null}
    </Box>
  );
};

export const LoadMoreInView = ({ isFetching, totalResults, limit, onChangeLimit }: Props) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!isFetching && inView) {
      onChangeLimit(limit + 2);
      // setLimit((prev) => prev + limitPosts);
    }
  }, [inView, onChangeLimit, isFetching]);

  return (
    <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
      {isFetching ? (
        <CircularProgress size={25} />
      ) : totalResults > limit ? (
        <CircularProgress ref={ref} size={25} />
      ) : null}
    </Box>
  );
};
