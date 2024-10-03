import ChatsAPI from "@/api/chats";

const chatsAPI = new ChatsAPI();

export const LoadChats = async () => {
  window.store.set({ isLoading: true });
  try {
    const chatsList = await chatsAPI.getChats();
    window.store.set({ chats: chatsList.data });
  } catch (error) {
    window.store.set({ Error: error });
  } finally {
    window.store.set({ isLoading: false });
  }
};
