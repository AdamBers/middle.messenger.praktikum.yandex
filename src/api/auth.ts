import { HTTPTransport } from "../core/httpTransport";
import {
  APIError,
  CreateUser,
  LoginRequestData,
  TResponse,
  UserDTO,
} from "./type";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
  async create(data: CreateUser): Promise<TResponse> {
    return authApi.post<TResponse>("/signup", { data });
  }

  async signin(data: LoginRequestData): Promise<TResponse | APIError> {
    const response = await authApi.post<TResponse | APIError>("/signin", {
      data,
    });
    return response;
  }

  async me(): Promise<(TResponse & { data: UserDTO }) | APIError> {
    return authApi.get("/user");
  }

  async logout(): Promise<TResponse | APIError> {
    return authApi.post("/logout");
  }
}
