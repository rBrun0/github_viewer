import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./index.css";
import { store } from "./store/index.ts";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error('Elemento "#root" não encontrado');
}

createRoot(rootElement).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
