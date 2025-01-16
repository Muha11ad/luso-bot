import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiError } from './types';

@Injectable()
export class ApiService {
  private baseUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('API_BASE_URL');
  }
  private apiClient() {
    return axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
  }
  public async getData<T>(endpoint: string) {
    try {
      const response = await this.apiClient().get<T>(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  public async postData<T, D>(endpoint: string, data: D): Promise<T | ApiError> {
    try {
      const response = await this.apiClient().post<T>(endpoint, data);
      return response.data;
    } catch (e: any) {
      return {
        message: e.response?.data?.message || 'An error occurred',
        error: e.response?.data?.error || 'Unknown Error',
        statusCode: e.response?.status || 500,
      };
    }
  }
}
