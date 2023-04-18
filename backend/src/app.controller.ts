import { Controller, Get, Headers, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IWorkout } from './data';
import { workerData } from 'worker_threads';

@Controller()
export class AppController {
    private readonly logger = new Logger(AppController.name);
    constructor(private readonly appService: AppService) {}

    @Get(`/workouts`)
    @Headers('Authorization')
    getHello() {
        return this.appService.getHello();
      }

    @Get('/workouts/:workoutDay')
    getWorkoutDay(@Param('workoutDay') day: string): IWorkout {
        return this.appService.getWorkoutDay(day);
    }
}
