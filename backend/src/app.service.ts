import { Injectable } from '@nestjs/common';
import { IWorkout, IWorkoutRoutine, workoutRoutine } from './data';

@Injectable()
export class AppService {
    getHello(): IWorkout[] {
        console.log('workout Routine', workoutRoutine);
        return workoutRoutine;
    }

    getWorkoutDay(day: string): IWorkout {
		const workoutDay = workoutRoutine.find((workout) => workout.url === day) 
		if (!workoutDay) return; // return if no workout exists 
        return workoutDay;
    }
}
