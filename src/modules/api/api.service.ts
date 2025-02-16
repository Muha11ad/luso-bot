import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { IProduct } from '@/shared/utils/types';
import { ENDPOINTS } from '@/shared/utils/consts';
import { handleApiError } from '@/shared/utils/helpers';
import { RecommendationCreateClientReq, ResponseType, UserCreateReq, UserType } from './api.types';

@Injectable()
export class ApiService {

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

  public async createOrGetUser(data: UserCreateReq): Promise<boolean> {

    try {

      const result = await this.postData<UserType, UserCreateReq>(ENDPOINTS.CREAET_USER, data);
      return result.success;

    } catch (error) {

      return error.response.data.success

    }
  }

  private async postData<T, D = {}>(endpoint: string, data: D): Promise<ResponseType<T>> {

    try {

      const response = await this.apiClient.post<ResponseType<T>>(endpoint, data);
      return response.data;

    } catch (error) {

      return handleApiError(error, endpoint, 'POST');

    }

  }

}