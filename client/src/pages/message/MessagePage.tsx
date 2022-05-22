import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Title } from 'components/App';
import { MessageHeader } from './components/MessageHeader';
import { MessageFooter } from './components/MessageFooter';
import { styleScroll } from 'utils';
import { MessageList } from './components/MessageList';
import { useAddToReadBy } from 'RQhooks/message.rq';

import { socketClient } from 'hooks/socket';
import { EVENTS } from 'contants/events';

export const MessagePage = () => {
  const { chatId } = useParams();

  const { mutate } = useAddToReadBy();

  // Add current user to read by
  useEffect(() => {
    chatId && mutate(chatId);
  }, [chatId, mutate]);

  // Add room to socket
  useEffect(() => {
    socketClient.emit(EVENTS.joinChat, chatId);
  }, [chatId]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Title */}
        <Box sx={{ borderBottom: '1px solid #38444d' }}>
          <Title title="Message" />
        </Box>

        {/* Message Header */}
        <MessageHeader chatId={chatId as string} />

        {/* Message Body */}
        <Box px={2} pt={4} sx={{ flex: 1, height: '100%', overflowY: 'auto', ...styleScroll }}>
          <MessageList chatId={chatId} />
        </Box>

        {/* Message Footer */}
        <MessageFooter chatId={chatId as string} />
      </Box>
    </>
  );
};
