import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { AuthHttpService } from './services/auth.http.service';
import { UserHttpService } from './services/user.http.service';
import { RecommenadionHttpService } from './services/recommendation.http.service';

@Module({
  providers: [HttpService, AuthHttpService, UserHttpService, RecommenadionHttpService],
  exports: [UserHttpService, RecommenadionHttpService, AuthHttpService],
})
export class HttpModule { }
