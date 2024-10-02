import ChatsAPI from "@/api/chats";

const chatsAPI = new ChatsAPI();

export const LoadMessages = async () => {
  window.store.set({ isLoading: true });
  try {
    const messages = chatsAPI.getChats();
    window.store.set(messages);
  } catch (error) {
    window.store.set({ Error: "some error" });
  } finally {
    window.store.set({ isLoading: false });
  }
};
