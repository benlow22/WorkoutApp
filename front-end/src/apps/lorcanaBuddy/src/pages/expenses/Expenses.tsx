import { DisplayExpenses } from "../../components/DisplayExpenses";
import { ExpensesInput } from "../../components/ExpensesInput";

export const ExpensesPage = () => {
	return (
		<div>
			<ExpensesInput /> <h2>Display Expenses GRID??</h2>
			<DisplayExpenses />
		</div>
	);
};
