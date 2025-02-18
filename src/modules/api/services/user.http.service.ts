import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { ENDPOINTS } from '@/shared/utils/consts';
import { AuthHttpService } from './auth.http.service';
import { handleApiError } from '@/shared/utils/helpers';
import { ERROR_CODES, UserCreateReq, UserGetAllReq, UserType } from '../http.types';

@Injectable()
export class UserHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthHttpService,
  ) { }


  public async createOrGetUser(data: UserCreateReq): Promise<boolean> {

    try {

      const result = await this.httpService.postData<UserType, UserCreateReq>(ENDPOINTS.CREAET_USER, data);
      return result.success;

    } catch (error) {

      return error.response.data.success

    }
  }

  public async getAllUsers(data: UserGetAllReq): Promise<UserType[]> {

    try {

      const token = await this.authService.getAccessToken();

      const result = await this.httpService.getData<UserType[]>(ENDPOINTS.GET_ALL_USERS, token);

      if (result.error.errId === ERROR_CODES.expiredToken) {

        const newToken = await this.authService.refreshToken();
        const res = await this.httpService.getData<UserType[]>(ENDPOINTS.GET_ALL_USERS, newToken);

        if (res.success) {

          return res.data;

        }

      }

    } catch (error) {

      return handleApiError(error, ENDPOINTS.GET_ALL_USERS, 'GET');

    }

  }

}