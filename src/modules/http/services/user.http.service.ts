import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { ENDPOINTS } from '@/shared/utils/consts';
import { AuthHttpService } from './auth.http.service';
import { UserCreateReq, UserType } from '../http.types';
import { handleApiError } from '@/shared/utils/helpers';

@Injectable()
export class UserHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly authService: AuthHttpService,
  ) { }

  public async createOrGetUser(data: UserCreateReq): Promise<boolean> {

    try {

      const result = await this.httpService.postData<{ users: UserType }, UserCreateReq>(ENDPOINTS.CREAET_USER, data);
      return result.success;

    } catch (error: any) {

      return error.response?.data?.success ?? false;

    }

  }

  public async getAllUsers(): Promise<UserType[]> {

    try {
    
      const token = await this.authService.getAccessToken();
      let result = await this.httpService.getData<{ users: UserType[] }>(ENDPOINTS.GET_ALL_USERS, token);

      if (!result.success) {

        handleApiError(result.error, ENDPOINTS.GET_ALL_USERS, 'GET');
        return [];
      
      }

      return result.data.users || [];
    
    } catch (error: any) {
    
      handleApiError(error, ENDPOINTS.GET_ALL_USERS, 'GET');
      return [];
    
    }
  
  }

}
