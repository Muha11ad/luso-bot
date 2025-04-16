import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ResponseType } from './http.types';
import { ConfigService } from '@nestjs/config';
import { handleApiError } from '@/shared/utils/helpers';
import { API_CONFIG } from '@/configs/api.config';

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
          origin: this.config.get<string>(API_CONFIG.origin),
        },
      },
      withCredentials: true,
    });
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

  public async postData<T, D = {}>(endpoint: string, data: D, token?: string): Promise<ResponseType<T>> {

    try {

      const response = await this.apiClient.post<ResponseType<T>>(endpoint, data, { headers: { authorization: token } });

      return response.data;

    } catch (error) {

      return handleApiError(error, endpoint, 'POST');

    }

  }

}