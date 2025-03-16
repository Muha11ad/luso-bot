import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { IProduct } from '@/shared/utils/types';
import { ENDPOINTS } from '@/shared/utils/consts';
import { AuthHttpService } from './auth.http.service';
import { handleApiError } from '@/shared/utils/helpers';
import { ERROR_CODES, RecommendationCreateReq, ResponseType } from '../http.types';

@Injectable()
export class RecommenadionHttpService {
    constructor(
        private readonly httpService: HttpService,
        private readonly authService: AuthHttpService,
    ) { }


    public async generate(data: RecommendationCreateReq): Promise<ResponseType<string>> {

        try {

            const token = await this.authService.getAccessToken();

            const result = await this.httpService.postData<string, RecommendationCreateReq>(ENDPOINTS.RECOMMENDATION_GENERATE, data, token);

            if (result.error.errId === ERROR_CODES.expiredToken) {

                const newToken = await this.authService.refreshToken();
                const result = await this.httpService.postData<string, RecommendationCreateReq>(ENDPOINTS.RECOMMENDATION_GENERATE, data, newToken);

                if (result.success) {

                    return result;

                }

            }

        } catch (error) {

            handleApiError(error, RecommenadionHttpService.name, this.generate.name);

            return error.response.data;

        }

    }

}