import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { AuthHttpService } from './services/auth.http.service';
import { UserHttpService } from './services/user.http.service';

@Module({
  providers: [HttpService, AuthHttpService, UserHttpService],
  exports: [UserHttpService],
})
export class ApiModule {}
