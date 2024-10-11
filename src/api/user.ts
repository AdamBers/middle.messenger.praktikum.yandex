import { HTTPTransport } from "@/core/httpTransport";
import { TResponse } from "./type";

const usersAPI = new HTTPTransport("/user");

export default class UsersAPI {
  async searchUser(login: string): Promise<TResponse> {
    // Передаём объект с полем login, так как сервер ожидает объект в формате JSON
    return usersAPI.post<TResponse>("/search", {
      data: { login },
    });
  }
  async updateProfile(data: {}): Promise<TResponse> {
    return usersAPI.put<TResponse>("/profile", { data });
  }
}
