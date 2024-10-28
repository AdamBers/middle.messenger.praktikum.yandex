export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: METHOD;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, "method">;

export class HTTPTransport {
  private apiUrl: string;
  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2${apiPath}`;
  }

  get<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<{ status: number; data: TResponse }> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<{ status: number; data: TResponse }> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  put<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<{ status: number; data: TResponse }> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.PUT,
    });
  }

  delete<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {}
  ): Promise<{ status: number; data: TResponse }> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.DELETE,
    });
  }

  async request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET }
  ): Promise<{ status: number; data: TResponse }> {
    const { method, data } = options;

    const isFormData = data instanceof FormData;

    const response = await fetch(url, {
      method,
      credentials: "include",
      mode: "cors",
      headers: !isFormData
        ? { "Content-Type": "application/json" } // Для JSON запроса
        : undefined, // Без заголовков для FormData
      body: data ? (isFormData ? data : JSON.stringify(data)) : null,
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    const resultData = isJson ? await response.json() : null;

    return {
      status: response.status,
      data: resultData as TResponse,
    };
  }
}
