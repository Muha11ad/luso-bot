export type ResponseType<T> = {
  data: T | null;
  error: null | ErrorResponseType;
  success: boolean;
}

export type ErrorResponseType = {
  errId: number;
  isFriendly: boolean;
  errMsg: { message: string };
}

export interface UserCreateReq {
  name: string;
  username?: string;
  telegramId: string;
}

export interface RecommendationCreateClientReq {
  age: string;
  purpose: string;
  skinType: string;
}

export interface UserType {
  name: string;
  username: string;
  telegram_id: number;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  access: string;
  refresh: string;
}

export interface UserGetAllReq {
  token: string;
}

export enum ERROR_CODES {
  expiredToken = 105,
}

export interface RefreshReq {
  refresh: string;
}

export interface RecommendationSaveReq {
  age: string;
  userId: string;
  purpose: string;
  skin_type: string;
  products: string[];
}