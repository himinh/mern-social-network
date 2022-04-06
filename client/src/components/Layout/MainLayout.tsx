import { Grid, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { Sidebar } from '../App';
import { Outlet } from 'react-router-dom';
import { FormSearch } from 'components/Common/Forms';
import { PostList, UserList } from 'components/Common';
import { posts, userFroms } from 'pages';

export const MainLayout = () => {
  return (
    <Grid container>
      <Grid item xs={2} px={2} sx={{ borderRight: 16, borderColor: blueGrey[800] }}>
        <Sidebar />
      </Grid>
      <Grid item xs={7} sx={{ borderRight: 1, borderColor: blueGrey[800] }}>
        <Box
          sx={{
            maxHeight: '100vh',
            scrollBehavior: 'smooth',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: blueGrey['A700'],
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: blueGrey[400],
            },
          }}
        >
          <Outlet />
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box px={2} my={3} sx={{ maxWidth: '100%' }}>
          <FormSearch fontSize={14} />
        </Box>
        <Box px={1}>
          <UserList users={userFroms} />
          {/* <PostList posts={posts} /> */}
        </Box>
      </Grid>
    </Grid>
  );
};
