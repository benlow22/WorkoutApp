import { useState } from "react";
import React from "react";

export default () => {
	const [count, setCount] = useState(0);
	return (
		<div className="bg-blue-900 text-white p-5">
			<div>Count = {count}</div>
			<button onClick={() => setCount(count + 1)}>Add One</button>
		</div>
	);
};
