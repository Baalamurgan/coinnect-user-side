/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { envs } from "../config/env";
import { ifSpreadObject } from "../lib/ifSpread";

export const API_HOST = envs.NEXT_PUBLIC_API;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Options<Req> extends Omit<AxiosRequestConfig<Req>, "url"> {
  url?: string;
}

export type Fetcher<Res, Req = any, Query = any> = (
  body?: Req,
  options?: Options<Req>,
  urlParams?: Query
) => Promise<ResWrapper<Res>>;

export interface DefaultOptions<Query> extends Omit<AxiosRequestConfig, "url"> {
  url: string | ((param: Query) => string);
  withTokenKey?: string;
  isFormData?: boolean;
  withUserAgent?: boolean;
}

export interface ErrorResponse {
  code: "ERR_BAD_RESPONSE" | string;
  config: any;
  message: "Request failed with status code 500" | string;
  name: "AxiosError" | string;
  stack: "AxiosError: Request failed with status code...";
  status: 400 | 409 | 500 | 502;
  response?: {
    data: {
      message?: string;
      status: "fail";
    };
    status: number;
    statusText: string;
  } & Record<string, any>;
}

export interface ResWrapper<T> {
  data?: T;
  status?: number;
  error?: ErrorResponse;
}

export const createFetcher =
  <Res = any, Req = any, Query = any>({
    url,
    withTokenKey,
    isFormData,
    withUserAgent,
    headers,
    ...defaultOptions
  }: DefaultOptions<Query>): Fetcher<Res, Req, Query> =>
  async (
    body?: Req,
    options: Options<Req> = {},
    urlParams?: Query
  ): Promise<ResWrapper<Res>> => {
    // LOG ALL APIS CALLED DURING BUILD OR SSR
    const route =
      typeof url === "function" ? url(urlParams || ({} as Query)) : url || "";
    if (typeof window === "undefined") {
      console.log(route);
    }
    const allHeaders = {
      "Content-Type": "application/json",
      ...ifSpreadObject(!!isFormData, {
        "Content-Type": "multipart/form-data",
      }),
      ...ifSpreadObject(!!withTokenKey, {
        Authorization:
          typeof window !== "undefined" &&
          withTokenKey &&
          `Bearer ${JSON.parse(localStorage.getItem(withTokenKey) ?? "")}`,
      }),
      ...ifSpreadObject(typeof window === "undefined" && !!withUserAgent, {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      }),
      ...headers,
    };
    return await axios({
      headers: allHeaders,
      url: route,
      timeout:
        process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
          ? undefined
          : typeof window === "undefined"
          ? 3000
          : undefined,
      ...defaultOptions,
      ...options,
      data: isFormData
        ? body
        : {
            ...defaultOptions.data,
            ...options.data,
            ...body,
          },
      params: {
        ...defaultOptions.params,
        ...options.params,
      },
    })
      .then((res) => {
        return { ...res.data };
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  };

export const apiRoute = (path: string) => `${API_HOST}/v1${path}`;

export const ROUTES = {
  AUTH: {
    USERS: {
      GETALL: apiRoute(`/auth/users`),
    },
    SIGNUP: apiRoute(`/auth/signup`),
    LOGIN: apiRoute(`/auth/login`),
    FETCHPROFILE: apiRoute(`/auth/profile`),
  },
  CATEGORY: {
    GETALL: apiRoute(`/category`),
  },
  ITEM: {
    GETALLOFACATEGORY: (p: { category_id: string }) =>
      apiRoute(`/item/category/${p.category_id}`),
    GETBYSLUG: (p: { slug: string }) => apiRoute(`/item/slug/${p.slug}`),
  },
  ORDER: {
    CREATE: apiRoute(`/order`),
  },
};
