import { fireEvent, render, screen } from "@testing-library/react";
import { WorkoutsPage } from "../WorkoutsPage";
import { BrowserRouter } from "react-router-dom";

const MockTodo = () => {
	return (
		<BrowserRouter>
			<Todo />
		</BrowserRouter>
	);
};

const addTask = (tasks) => {
	// function to add tasks automatically
	// find each element you want to interact with
	const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
	const buttonElement = screen.getByRole("button", { name: /Add/i });

	// for each task in the array, add
	tasks.forEach((task) => {
		fireEvent.change(inputElement, { target: { value: task } });
		fireEvent.click(buttonElement);
	});
};

describe("Todo", () => {
	it("should render same text passed into title prop component", () => {
		render(<MockTodo />);
		addTask(["Go Shopping"]);
		const divElement = screen.getByText(/Go Shopping/i);
		expect(divElement).toBeInTheDocument(); // see if it is on the DOM
	});

	it("should render multiple items", () => {
		render(<MockTodo />);
		addTask(["go shop", "go shopping", "poop"]);
        const footerElement = screen.getByText(/3 tasks left/i);
		const divElements = screen.getAllByTestId("testsss");
		expect(divElements.length).toBe(3);
        expect(footerElement).toBeInTheDocument();
	});

    it("task should not have completed class when initially rendered", () => {
		render(<MockTodo />);
		addTask(["Go Shopping"]);
		const divElement = screen.getByText(/Go Shopping/i);
		expect(divElement).not.toHaveClass("todo-item-active"); 
	});

    it("task should have completed class when clicked", () => {
		render(<MockTodo />);
		addTask(["Go Shopping"]);
		const divElement = screen.getByText(/Go Shopping/i);
        fireEvent.click(divElement);
		expect(divElement).toHaveClass("todo-item-active"); 
	});

});


