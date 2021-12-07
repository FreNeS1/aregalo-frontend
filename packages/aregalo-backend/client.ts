import Axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { GiftPresent, User, WishCreatePresent, WishPresent } from "./models";
import { to } from "../util";
import morphism from "morphism";
import { giftPresentSchema, userSchema, wishPresentSchema } from "./schema";

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

  async getPresentWishList(wisher: string): Promise<WishPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.get(`/${wisher}/presents`)
    );
    return handleListResponse<WishPresent>(response, err, (data: any[]) =>
      morphism(wishPresentSchema, data)
    );
  }

  async createPresent(
    wisher: string,
    present: WishCreatePresent
  ): Promise<WishPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.post(`/${wisher}/presents`, present)
    );
    return handleListResponse<WishPresent>(response, err, (data: any[]) =>
      morphism(wishPresentSchema, data)
    );
  }

  async updatePresent(
    wisher: string,
    present: WishPresent
  ): Promise<WishPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.put(`/${wisher}/presents/${present.id}`, present)
    );
    return handleListResponse<WishPresent>(response, err, (data: any[]) =>
      morphism(wishPresentSchema, data)
    );
  }

  async deletePresent(
    wisher: string,
    present: WishPresent
  ): Promise<WishPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.delete(`/${wisher}/presents/${present.id}`)
    );
    return handleListResponse<WishPresent>(response, err, (data: any[]) =>
      morphism(wishPresentSchema, data)
    );
  }

  async getGiftPresentList(
    wisher: string,
    gifter: string
  ): Promise<GiftPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.get(`/${gifter}/${wisher}/presents/`)
    );
    return handleListResponse<GiftPresent>(response, err, (data: any[]) =>
      morphism(giftPresentSchema, data)
    );
  }

  async assignGifterToPresent(
    wisher: string,
    gifter: string,
    present: GiftPresent
  ): Promise<GiftPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.put(`/${gifter}/${wisher}/presents/${present.id}`)
    );
    return handleListResponse<GiftPresent>(response, err, (data: any[]) =>
      morphism(giftPresentSchema, data)
    );
  }

  async removeGifterFromPresent(
    wisher: string,
    gifter: string,
    present: GiftPresent
  ): Promise<GiftPresent[]> {
    const [response, err] = await to<AxiosResponse, AxiosError>(
      this.httpClient.delete(`/${gifter}/${wisher}/presents/${present.id}`)
    );
    return handleListResponse<GiftPresent>(response, err, (data: any[]) =>
      morphism(giftPresentSchema, data)
    );
  }
}

function handleResponse<T>(
  response: AxiosResponse | undefined,
  err: AxiosError | null,
  mapper: (s: any) => T
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (err) {
      reject(err.message);
    }
    if (response) {
      resolve(mapper(response.data));
    }
    reject("Unexpected error in Aregalo client");
  });
}

function handleListResponse<T>(
  response: AxiosResponse<any[]> | undefined,
  err: AxiosError | null,
  mapper: (s: any) => T[]
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (err) {
      reject(err.message);
    }
    if (response) {
      resolve(mapper(response.data));
    }
    reject("Unexpected error");
  });
}
