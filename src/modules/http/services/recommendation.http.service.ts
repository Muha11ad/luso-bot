import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { IProduct } from '@/shared/utils/types';
import { ENDPOINTS } from '@/shared/utils/consts';
import { AuthHttpService } from './auth.http.service';
import { handleApiError } from '@/shared/utils/helpers';
import { ERROR_CODES, RecommendationCreateClientReq, RecommendationSaveReq, ResponseType } from '../http.types';

@Injectable()
export class RecommenadionHttpService {
    constructor(
        private readonly httpService: HttpService,
        private readonly authService: AuthHttpService,
    ) { }


    public async getRecommendedProducts(data: RecommendationCreateClientReq): Promise<ResponseType<IProduct[]>> {

        try {

            const result = await this.httpService.postData<IProduct[], RecommendationCreateClientReq>(ENDPOINTS.RECOMMENDATION_GET, data);

            return result;

        } catch (error) {

            handleApiError(error, RecommenadionHttpService.name, 'saveRecommendation');
            return error.response.data;

        }

    }

    public async saveRecommendation(data: RecommendationSaveReq): Promise<ResponseType<boolean>> {

        try {

            const token = await this.authService.getAccessToken();

            const result = await this.httpService.postData<boolean, RecommendationSaveReq>(ENDPOINTS.RECOMMENDATION_SAVE, data, token);

            if (result.error.errId === ERROR_CODES.expiredToken) {

                const newToken = await this.authService.refreshToken();
                const result = await this.httpService.postData<boolean, RecommendationSaveReq>(ENDPOINTS.RECOMMENDATION_SAVE, data, newToken);

                if (result.success) {

                    return result;

                }

            }

        } catch (error) {

            handleApiError(error, RecommenadionHttpService.name, 'saveRecommendation');
            return error.response.data;

        }

    }

}