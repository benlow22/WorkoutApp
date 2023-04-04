import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";
import { Header } from "./Header";
function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Header />
			<div className="main">
				<Login />
			</div>
		</div>
	);
}

export default App;
