import { ApiError } from "../utils/ApiError.util";

const BASE_URL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || "http://localhost:3030";

interface IApiService {
  get: <T>(endpoint: string, data?: unknown) => Promise<T>;
  post: <T>(endpoint: string, data?: unknown) => Promise<T>;
  put: <T>(endpoint: string, data?: unknown) => Promise<T>;
  delete: <T>(endpoint: string, data?: unknown) => Promise<T>;
}

export const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
export type THttpPostResponse<T> = {
  massage: string;
  data: T;
};

export type THttpErrorResponse = {
  message?: string;
  errors?: Record<string, string>;
};
type THttpMethod = (typeof HTTP_METHODS)[number];

export const apiService: IApiService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
};

const ajax = async <T>(
  endpoint: string,
  method: THttpMethod,
  data: unknown = null
): Promise<T> => {
  let url = `${BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...(data instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  };

  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  } else if (method === "GET" && data) {
    const queryParams = new URLSearchParams(data as Record<string, string>);
    url += `?${queryParams.toString()}`;
  }

  console.info("Calling API endpoint:", url, "with options:", options);
  const res = await fetch(url, options);
  if (!res.ok) {
    let errorBody: THttpErrorResponse;
    try {
      errorBody = await res.json();
    } catch {
      errorBody = {};
    }
    throw new ApiError(
      errorBody?.message || res.statusText,
      res.status,
      errorBody?.errors
    );
  }

  return (await res.json()) as T;
};
