import { fireEvent, render, screen } from "@testing-library/react";
import { WorkoutsPage } from "../WorkoutsPage";
import { BrowserRouter } from "react-router-dom";

// const MockTodo = () => {
// 	return (
// 		<BrowserRouter>
// 			<Todo />
// 		</BrowserRouter>
// 	);
// };

// const addTask = (tasks) => {
// 	// function to add tasks automatically
// 	// find each element you want to interact with
// 	const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
// 	const buttonElement = screen.getByRole("button", { name: /Add/i });

// 	// for each task in the array, add
// 	tasks.forEach((task) => {
// 		fireEvent.change(inputElement, { target: { value: task } });
// 		fireEvent.click(buttonElement);
// 	});
// };

describe("WorkoutsPage", () => {
	it("should render 3 workouts and 1 add workout buttons", () => {
		render(<WorkoutsPage />);
		const buttonElement = screen.getAllByRole("button");
		expect(buttonElement.length).toBe(4); // see if it is on the DOM
	});
});


