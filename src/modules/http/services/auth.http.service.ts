import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../http.service';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ADMIN_CONFIG } from '@/configs/admin.config';
import { handleApiError } from '@/shared/utils/helpers';
import { LoginReq, LoginRes, RefreshReq } from '../http.types';
import { ENDPOINTS, REDIS_KEYS } from '@/shared/utils/consts';

@Injectable()
export class AuthHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  public async getAccessToken(): Promise<string> {

    const token = await this.cacheManager.get<string>(REDIS_KEYS.access)

    if (!token) {

      await this.StoreToken()
      const token = await this.cacheManager.get<string>(REDIS_KEYS.access)
      return token

    }

    return token

  }

  public async refreshToken(): Promise<string> {

    try {
      const refreshToken = await this.cacheManager.get<string>(REDIS_KEYS.refresh)

      if (!refreshToken) {

        await this.StoreToken()
        const token = await this.cacheManager.get<string>(REDIS_KEYS.access)
        return token

      }

      const res = await this.httpService.postData<LoginRes, RefreshReq>(ENDPOINTS.REFRESH, { refresh: refreshToken })

      if (res.success) {

        await this.StoreToken()
        const token = await this.cacheManager.get<string>(REDIS_KEYS.access)
        return token
      
      } else {
      
        await this.cacheManager.del(REDIS_KEYS.access)
        await this.cacheManager.del(REDIS_KEYS.refresh)
        return ''
      
      }

    } catch (error) {

      return handleApiError(error, ENDPOINTS.REFRESH, "POST")

    }

  }

  private async StoreToken() {

    try {

      const token = await this.authorize()

      await this.cacheManager.set(REDIS_KEYS.access, token.access,)
      await this.cacheManager.set(REDIS_KEYS.refresh, token.refresh,)

    } catch (error) {

      await this.cacheManager.del(REDIS_KEYS.access)
      await this.cacheManager.del(REDIS_KEYS.refresh)

      console.log('Error storing token', error)

    }

  }

  private async authorize(): Promise<LoginRes> {

    try {

      const email = this.configService.get(ADMIN_CONFIG.email)
      const password = this.configService.get(ADMIN_CONFIG.password)

      const data: LoginReq = {
        email,
        password
      }

      const res = await this.httpService.postData<LoginRes, LoginReq>(ENDPOINTS.LOGIN, data)

      return res.data

    } catch (error) {

      return handleApiError(error, ENDPOINTS.LOGIN, "POST")

    }

  }
}