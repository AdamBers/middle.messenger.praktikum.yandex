declare module "*.hbs?raw" {
  const content: string;
  export default content;
}

declare module "fetch-mock" {
  const fetchMock: FetchMockStatic;

  interface FetchMockStatic {
    get: (url: string, response: any) => void;
    post: (url: string, response: any) => void;
    reset: () => void;
    lastCall: () => [string, RequestInit | undefined] | undefined;
  }

  export default fetchMock;
}

