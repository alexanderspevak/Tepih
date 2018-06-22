import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Hello World!';
  }
  someRoute(): string {
    return 'testing routes';
  }
}
