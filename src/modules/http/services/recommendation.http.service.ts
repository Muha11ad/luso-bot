import { Injectable } from '@nestjs/common';
import { HttpService } from '../http.service';
import { ENDPOINTS } from '@/shared/utils/consts';
import { handleApiError } from '@/shared/utils/helpers';
import { RecommendationCreateReq, ResponseType } from '../http.types';

@Injectable()
export class RecommenadionHttpService {
    constructor(
        private readonly httpService: HttpService,
    ) { }


    public async generate(data: RecommendationCreateReq): Promise<ResponseType<string>> {

        try {


            const result = await this.httpService.postData<{ recommendations: string }, RecommendationCreateReq>(ENDPOINTS.RECOMMENDATION_GENERATE, data);

            return {error: result.error, data: result.data?.recommendations || '', success: result.success};

        } catch (error) {

            return handleApiError(error, RecommenadionHttpService.name, this.generate.name);

        }

    }

}