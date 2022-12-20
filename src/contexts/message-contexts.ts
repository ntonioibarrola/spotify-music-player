import create from 'zustand';
import { Message } from '../types/message-types';

interface MessageState {
  message: Message | null;
  isMessageOpen: boolean;

  setMessage: (message: MessageState['message']) => void;
  setIsMessageOpen: (isMessageOpen: MessageState['isMessageOpen']) => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  message: null,
  isMessageOpen: false,

  setMessage: (message) => set({ message }),
  setIsMessageOpen: (isMessageOpen) => set({ isMessageOpen }),
}));
