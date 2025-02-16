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
  telegramId: number;
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