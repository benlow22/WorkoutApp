import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IWorkout } from './data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IWorkout[] {
    return this.appService.getHello();
  }

}
