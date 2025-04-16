import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '../http.service';
import { LoginReq, LoginRes } from '../http.types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ADMIN_CONFIG } from '@/configs/admin.config';
import { handleApiError } from '@/shared/utils/helpers';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ENDPOINTS, REDIS_KEYS } from '@/shared/utils/consts';

@Injectable()
export class AuthHttpService {

  private readonly logger: Logger

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {

    this.logger = new Logger(AuthHttpService.name)
  }

  public async getAccessToken(): Promise<string> {

    // expired token will be deleted from cache with ttl
    const token = await this.cacheManager.get<string>(REDIS_KEYS.access)

    // if token expired authorize again
    if (!token) {

      const result = await this.authorize()
      
      await this.storeToken(result.access)

      const token = await this.cacheManager.get<string>(REDIS_KEYS.access)
      
      return token

    }

    return token

  }

  private async storeToken(access: string) {

    try {

      await this.cacheManager.set(REDIS_KEYS.access, access, 60 * 60 * 23 )

    } catch (error) {

      await this.cacheManager.del(REDIS_KEYS.access)

      this.logger.error('Error while storing token', error.message)

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

      const res = await this.httpService.postData<{ auth: LoginRes }, LoginReq>(ENDPOINTS.LOGIN, data)

      return res.data.auth

    } catch (error) {

      return handleApiError(error, ENDPOINTS.LOGIN, "POST")

    }

  }
}