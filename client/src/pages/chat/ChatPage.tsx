import { Box } from '@mui/material';
import { Title } from 'components/App';

type Props = {};

export const ChatPage = (props: Props) => {
  return (
    <>
      <Box sx={{ borderBottom: '1px solid #38444d' }}>
        <Title title="Inbox" />
      </Box>
    </>
  );
};
