import { Injectable } from '@nestjs/common';
import { IWorkout, workoutRoutine } from './data';

@Injectable()
export class AppService {
  getHello(): IWorkout[] {
    console.log("workout Routine", workoutRoutine);
    return workoutRoutine;
  }
}
