import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { LoadMoreButton } from 'components/App';
import { UserItem } from 'components/Common';
import { UserListSkeleton } from 'components/Common/Variants';
import { limitUsers } from 'contants/pagination';
import { User } from 'interface';
import { useState } from 'react';
import { useUsers } from 'RQhooks';

type Props = {
  handleAddUsersSelected: (user: User) => void;
  usersSelected: User[];
  search: string;
};

export const ChatUserList = ({ search, handleAddUsersSelected, usersSelected }: Props) => {
  const [limit, setLimit] = useState(limitUsers);
  const { data, isFetching, isLoading } = useUsers({ limit, search }, { cacheTime: 1 * 60 * 1000 });

  if (isLoading || !data) return <UserListSkeleton />;
  const { users, info } = data;

  return (
    <Box px={2}>
      {users.map((user) => {
        if (usersSelected.some((userSelected) => userSelected.id === user.id)) return;

        return (
          <Box
            onClick={() => handleAddUsersSelected(user)}
            key={user.id}
            py={2}
            px={2}
            sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #38444d' }}
          >
            <UserItem user={user} />
          </Box>
        );
      })}

      <LoadMoreButton
        isFetching={isFetching}
        totalResults={info.totalResults}
        limit={limit}
        onChangeLimit={(limit) => setLimit(limit)}
      />

      {users && users.length === 0 && (
        <Typography textAlign="center" fontSize={16}>
          Nothing to show.
        </Typography>
      )}
    </Box>
  );
};