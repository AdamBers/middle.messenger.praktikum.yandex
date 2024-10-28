import fetchMock from "fetch-mock";
import { expect } from "chai";
import { HTTPTransport } from "./httpTransport";
import fetch from "node-fetch";

(global as any).fetch = fetch;

// Без полифилов — только моки для тестов
describe("HTTPTransport", () => {
  const api = new HTTPTransport("/auth");

  // beforeEach(() => {
  //   fetchMock.reset();
  // });

  // afterEach(() => {
  //   fetchMock.reset();
  // });

  it("should send a GET request", async function () {
    this.timeout(5000);
    const mockResponse = { id: 1, name: "Test User" };
    fetchMock.get("https://ya-praktikum.tech/api/v2/auth/user", {
      status: 401,
      body: mockResponse,
    });

    const response = await api.get<{ id: number; name: string }>("/user");
    expect(response.status).to.equal(401);
  });
});
