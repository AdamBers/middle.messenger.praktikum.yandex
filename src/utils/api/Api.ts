enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface RequestOptions {
  data?: Record<string, any>;
  timeout?: number;
  headers?: Record<string, string>;
}

interface InternalRequestOptions extends RequestOptions {
  method: HTTPMethods;
}

type HTTPRequestFunction = (
  url: string,
  options?: RequestOptions
) => Promise<string>;

function buildQueryParams(params: Record<string, any>): string {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}

export default class HTTPTransport {
  get: HTTPRequestFunction = (url, options = {}) => {
    const { data = {} } = options;
    const queryParams = buildQueryParams(data);
    const finalUrl = queryParams ? `${url}?${queryParams}` : url;

    return this.sendRequest(
      finalUrl,
      { ...options, method: HTTPMethods.GET },
      options.timeout
    );
  };

  post: HTTPRequestFunction = (url, options = {}) => {
    return this.sendRequest(
      url,
      { ...options, method: HTTPMethods.POST },
      options.timeout
    );
  };

  put: HTTPRequestFunction = (url, options = {}) => {
    return this.sendRequest(
      url,
      { ...options, method: HTTPMethods.PUT },
      options.timeout
    );
  };

  delete: HTTPRequestFunction = (url, options = {}) => {
    return this.sendRequest(
      url,
      { ...options, method: HTTPMethods.DELETE },
      options.timeout
    );
  };

  private sendRequest<T>(
    url: string,
    options: InternalRequestOptions,
    timeout = 5000
  ): Promise<T> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      if (headers) {
        for (const header in headers) {
          xhr.setRequestHeader(header, headers[header]);
        }
      }

      xhr.timeout = timeout;

      xhr.onload = () => {
        resolve(xhr.response as T);
      };

      xhr.onerror =
        xhr.onabort =
        xhr.ontimeout =
          () => {
            reject(new Error(`Request failed with method ${method} at ${url}`));
          };

      if (method === HTTPMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
