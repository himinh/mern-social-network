import axios from 'axios';
import { Chat, ChatsResponse } from 'interface';
import axiosInstance from 'utils/axiosInstance';

const chatUrl = '/api/chats';
export const chatApi = {
  getChats({ queryKey = ['chats?page=1&limit=1'] }): Promise<ChatsResponse> {
    return axiosInstance.get(`api/${queryKey[0]}`);
  },

  getChat(chatId: string): Promise<Chat> {
    return axiosInstance.get(`${chatUrl}/${chatId}`);
  },

  getChatBySlug(slug = ''): Promise<Chat> {
    return axiosInstance.get(`${chatUrl}/${slug}/slug`);
  },

  createChat(chat: {}): Promise<Chat> {
    return axiosInstance.post(`${chatUrl}`, chat, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  updateChat(chatData: { filter: { chatId: string }; body: {} }): Promise<Chat> {
    return axiosInstance.patch(`${chatUrl}/${chatData.filter.chatId}`, chatData.body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  deleteChat(chatId: string) {
    return axios.delete(`${chatUrl}/${chatId}`);
  },
};
