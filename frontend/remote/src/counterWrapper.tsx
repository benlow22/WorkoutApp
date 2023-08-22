import { useState } from "react";
import React from "react";
import Counter from "./Counter";
import ReactDOM from "react-dom";

export default (el: HTMLElement) => {
	ReactDOM.render(<Counter />, el);
};
