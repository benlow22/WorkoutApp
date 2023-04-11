import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { IWorkout } from './data';
import { workerData } from 'worker_threads';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): IWorkout[] {
        return this.appService.getHello();
    }

    @Get('/workouts/:workoutDay')
    getWorkoutDay(@Param('workoutDay') day: string): IWorkout {
        return this.appService.getWorkoutDay(day);
    }
}
