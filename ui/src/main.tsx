/* @refresh reload */
import "./app.css";
import { render } from "solid-js/web";
import { App } from "./App";

const rootStyle = getComputedStyle(document.documentElement);
if (!rootStyle.getPropertyValue("--sidebarPaddingX").trim()) {
	document.documentElement.style.setProperty("--sidebarPaddingX", "20px");
}
if (!rootStyle.getPropertyValue("--sidebarPaddingTop").trim()) {
	document.documentElement.style.setProperty("--sidebarPaddingTop", "4px");
}

const root = document.getElementById("tailwind-sail-ui");

if (root) {
	render(() => <App />, root);
}
