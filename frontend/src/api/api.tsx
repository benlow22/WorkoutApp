const API_ENDPOINT = "http://localhost:3000";

export const getWorkouts = async () => {
    console.log('hello! from getCritters');
    try {
        const response = await fetch(`${API_ENDPOINT}/`);
        console.log('response');
        const workouts = response.json();
        return workouts;
    } catch (error) {
        console.log('errrrror', error);
        return { error };
    }
};
