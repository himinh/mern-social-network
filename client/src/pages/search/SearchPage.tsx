import { useEffect, useState } from 'react';
import { Title } from 'components/App';
import { Box } from '@mui/material';
import { Tab } from 'components/Common/Buttons/Tab';
import { FormInputSearch, PostList, UserList } from 'components/Common';
import { User, Post } from 'interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { FormSearch } from './FormSearch';

export const userFroms: User[] = [
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    username: 'minchiu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '6227646a0588488cd53eb293',
  },
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    username: 'minchiu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '12123123',
  },
  {
    profilePic:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1639037693/avatar/avatar-default_emyynu.png',
    name: 'Minh Chìu',
    username: 'minchiu',
    email: 'minhch.vn@gmail.com',
    role: 'admin',
    createdAt: '2022-03-08T14:12:58.562Z',
    updatedAt: '2022-03-08T14:25:39.750Z',
    id: '62271fw23646a0588488cd53eb293',
  },
];
const posts: Post[] = [
  {
    id: '123',
    text: 'thứ 5, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    user: userFroms[0],
  },
  {
    id: '1234',
    text: 'thứ 523, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    image:
      'https://res.cloudinary.com/djvd6zhbg/image/upload/v1645065070/postImage/fik7evjfx3bg0a5tzweq.png',
    user: userFroms[1],
  },
  {
    id: '1235',
    text: 'thứ 23, ngày 17 tháng 2 năm 202',
    createdAt: '2022-04-06T04:28:09.879Z',
    user: userFroms[0],
  },
];

export type SearchProps = {
  text: string;
};
export const SearchPage = () => {
  const location = useLocation();
  const selectedTab = location.pathname.split('/').slice(-1)[0] as 'posts' | 'users';
  const isSelectedPosts = selectedTab === 'posts';
  const queryKey = isSelectedPosts ? 'text' : 'name';
  const navigate = useNavigate();
  const queryValue = location.search.split('=')[1];

  useEffect(() => {
    console.log({ queryValue });
  }, [queryValue]);

  return (
    <>
      {/* Title */}
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Search" />
      </Box>

      {/* Form search */}
      <Box px={10} my={3} sx={{ maxWidth: '100%' }}>
        <FormSearch queryKey={queryKey} />
      </Box>

      {/* Tab control */}
      <Box mx={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Tab
          onClick={() => {
            navigate('/search/users');
          }}
          text="Users"
          active={!isSelectedPosts}
        />
        <Tab
          onClick={() => {
            navigate('/search/posts');
          }}
          text="Posts"
          active={isSelectedPosts}
        />
      </Box>
      <Box sx={{ borderBottom: '1px solid #38444d' }} my={2} mt={4} />

      {/* Result */}
      {isSelectedPosts ? <PostList posts={posts} /> : <UserList users={userFroms} />}
    </>
  );
};
