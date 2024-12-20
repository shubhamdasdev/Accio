import { create } from 'zustand';
import { chat } from '@/lib/api';

interface ChatMessage {
  id: string;
  message: string;
  role: 'user' | 'assistant';
  createdAt: string;
}

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  fetchHistory: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

export const useChat = create<ChatState>((set, get) => ({
  messages: [],
  loading: false,
  fetchHistory: async () => {
    set({ loading: true });
    try {
      const data = await chat.getHistory();
      set({ messages: data });
    } finally {
      set({ loading: false });
    }
  },
  sendMessage: async (message) => {
    const [userMessage, assistantMessage] = await chat.sendMessage(message);
    set({
      messages: [...get().messages, userMessage, assistantMessage],
    });
  },
}));