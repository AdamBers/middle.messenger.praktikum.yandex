import { HTTPTransport } from "../core/httpTransport";
import { TResponse } from "./type";

const chatsAPI = new HTTPTransport("/chats");

export default class ChatsAPI {
  async getChats(): Promise<TResponse> {
    return chatsAPI.get("/");
  }

  async createChat(data: string): Promise<TResponse> {
    console.log({ title: data });
    return chatsAPI.post<TResponse>("/", { data: { title: data } });
  }

  async getToken(chatId: number): Promise<TResponse> {
    return chatsAPI.post<TResponse>(`/token/${chatId}`);
  }

  async addUserToChat(users: number[], chatId: number): Promise<TResponse> {
    return chatsAPI.put<TResponse>("/users", {
      data: {
        users,
        chatId,
      },
    });
  }

  async DeleteUserFromChat(
    users: number[],
    chatId: number
  ): Promise<TResponse> {
    return chatsAPI.delete<TResponse>("/users", {
      data: {
        users,
        chatId,
      },
    });
  }
}
