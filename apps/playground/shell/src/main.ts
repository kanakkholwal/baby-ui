import { mount } from "svelte";
import Shell from "./Shell.svelte";
import "./app.css";

export default mount(Shell, { target: document.getElementById("app") as HTMLElement });
