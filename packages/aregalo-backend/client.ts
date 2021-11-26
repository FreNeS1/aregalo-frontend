import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { User } from "./models";
import { to } from "../util";
import morphism from "morphism";
import { userSchema } from "./schema";

export class AregaloBackendClient {
  httpClient: AxiosInstance;

  constructor(apiURL: string) {
    this.httpClient = Axios.create({
      baseURL: apiURL,
      timeout: 5000,
      responseType: "json",
    });
  }

  async getUsers(): Promise<User[]> {
    const [response, err] = await to<AxiosResponse<any[]>, AxiosError>(
      this.httpClient.get("/users")
    );
    return handleListResponse<User>(response, err, (data: any[]) =>
      morphism(userSchema, data)
    );
  }

  async getUser(name: string): Promise<User> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.get(`/users/${name}`)
    );
    return handleResponse<User>(response, err, (data) =>
      morphism(userSchema, data)
    );
  }
}

function handleResponse<T>(
  response: AxiosResponse | undefined,
  err: AxiosError | null,
  mapper: (s: any) => T
): T {
  if (err) {
    throw new Error(err.toJSON().toString());
  }
  if (response) {
    return mapper(response.data);
  }
  throw new Error("Unexpected error");
}

function handleListResponse<T>(
  response: AxiosResponse<any[]> | undefined,
  err: AxiosError | null,
  mapper: (s: any) => T[]
): T[] {
  if (err) {
    throw new Error(err.toJSON().toString());
  }
  if (response) {
    return mapper(response.data);
  }
  throw new Error("Unexpected error");
}
