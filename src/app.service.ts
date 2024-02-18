import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'THIS IS LIWONDE PRIVATE API';
  }
}
