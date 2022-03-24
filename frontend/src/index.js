import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AlertProvider } from "./Contexts/AlertContext";
import { AuthProvider } from "./Contexts/AuthContext";
import { LatLongProvider } from "./Contexts/LatLongContext";
import { DataEntryProvider } from "./Contexts/DataEntryContext";
import { DrawerProvider } from "./Contexts/DrawerContext";

import "./index.css";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AlertProvider>
				<AuthProvider>
					<LatLongProvider>
						<DataEntryProvider>
							<DrawerProvider>
								<App />
							</DrawerProvider>
						</DataEntryProvider>
					</LatLongProvider>
				</AuthProvider>
			</AlertProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
