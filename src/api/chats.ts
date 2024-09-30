import { HTTPTransport } from "../core/httpTransport";
import { TResponse } from "./type";

const chatsAPI = new HTTPTransport("/chats");

export default class ChatsAPI {
  async getChats(data?: string): Promise<TResponse> {
    // console.log(data);
    return chatsAPI.get("/");
  }
}
