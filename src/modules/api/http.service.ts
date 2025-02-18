import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { IProduct } from '@/shared/utils/types';
import { ENDPOINTS } from '@/shared/utils/consts';
import { handleApiError } from '@/shared/utils/helpers';
import { RecommendationCreateClientReq, ResponseType, UserCreateReq, UserType } from './http.types';

@Injectable()
export class HttpService {

  private baseUrl: string;
  private apiClient: AxiosInstance;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get<string>('api.baseUrl');
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        options: {
          origin: this.config.get<string>('api.origin'),
        },
      },
      withCredentials: true,
    });
  }

  public async getRecommendedProducts(data: RecommendationCreateClientReq): Promise<ResponseType<IProduct[]>> {

    try {

      const result = await this.postData<IProduct[], RecommendationCreateClientReq>(ENDPOINTS.RECOMMENDATION, data);

      return result;

    } catch (error) {

      return error.response.data;

    }

  }

  public async getData<T>(endpoint: string, token?: string): Promise<ResponseType<T>> {

    try {

      const response = await this.apiClient.get<ResponseType<any>>(endpoint, {
        headers: {
          authorization: token,
        },
      });

      return response.data;

    } catch (error) {

      return handleApiError(error, endpoint, 'GET');

    }

  }

  public async postData<T, D = {}>(endpoint: string, data: D): Promise<ResponseType<T>> {

    try {

      const response = await this.apiClient.post<ResponseType<T>>(endpoint, data);
      return response.data;

    } catch (error) {

      return handleApiError(error, endpoint, 'POST');

    }

  }

}