import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<>
			<Header />
			<main>
				<div className="content">
					<Outlet />
				</div>
			</main>
		</>
	);
}
