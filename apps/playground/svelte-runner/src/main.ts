import { mount } from "svelte";
import Runner from "./Runner.svelte";
import "./app.css";

export default mount(Runner, { target: document.getElementById("app") as HTMLElement });
