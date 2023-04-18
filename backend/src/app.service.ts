import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IWorkout, IWorkoutRoutine, workoutRoutine } from './data';
import { Supabase } from './supabase';

@Injectable()
export class AppService {
    constructor(private readonly supabase: Supabase) {}
    async getHello() {
        try {
            // Get the authorization header from the request.
            // When you invoke the function via the client library it will automatically pass the authenticated user's JWT.
            const authHeader = req.headers.get('Authorization');
            const supa = this.supabase.getClient();
            const {
                data: { user },
            } = await supa.auth.getUser(authHeader);
            console.log('   USER ', user);
        } catch (err) {
            console.log('FUCKKKKKK');
            if (err) {
                console.log('ERRRR', err);
                throw new InternalServerErrorException(err.message);
            }
            // return workoutRoutine;
        }
    }

    getHello2(): any {
        console.log('workout Routine', workoutRoutine);
        async function fetchPosts() {
            const {
                data: { user },
            } = await this.supabase.auth.getUser();
            const { data } = await this.supabase
                .from('workouts')
                .select('*')
                .eq('user_id', user.id);
            let userData = data;
            return userData;
        }
        let workouts = fetchPosts();
        return workouts;
    }

    getWorkoutDay(day: string): IWorkout {
        console.log('WORKOUT DAY');
        const workoutDay = workoutRoutine.find(
            (workout) => workout.url === day,
        );
        if (!workoutDay) return; // return if no workout exists
        return workoutDay;
    }
}
