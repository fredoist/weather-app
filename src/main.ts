import "reset.css";
import "@fontsource/fira-mono/400.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
