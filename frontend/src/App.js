import { Routes, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import Dashboard from "./Components/dashboard/Dashboard";
import DataEntryRO from "./Components/data/layout/DataEntryRO";
import DataEntryDO from "./Components/data/layout/DataEntryDO";
import AlertUI from "./Components/layout/Alert";
import Landing from "./Components/layout/Landing";
import Navbar from "./Components/layout/Navbar";
import PrivateRoute from "./Components/route/PrivateRoute";
import AdminRoute from "./Components/route/AdminRoute";
import { AuthContext } from "./Contexts/AuthContext";
import { useEffect, useContext } from "react";
import AdminPanel from "./Components/admin/AdminPanel";
import jwt from "jsonwebtoken";
import setAuthToken from "./Services/setAuthToken";
import Visualization from "./Components/data/layout/visualisation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PageNotFound from "./Components/layout/PageNotFound";
import appTheme from "./appTheme";
import Logout from "./Components/auth/Logout";

function App() {
	const { loadUser, logout } = useContext(AuthContext);

	if (localStorage.getItem("user")) {
		setAuthToken(JSON.parse(localStorage.getItem("user")).access_token);

		jwt.verify(
			JSON.parse(localStorage.getItem("user")).access_token,
			"secret",
			function (err, decode) {
				if (err) {
					console.log(err);
					logout();
				} else {
					// loadUser()
				}
			}
		);
	}

	useEffect(() => {
		if (localStorage.getItem("user")) {
			loadUser();
		}
	}, []);

	// Theme for the App
	const theme = createTheme(appTheme);

	return (
		<>
			<ThemeProvider theme={theme}>
				<Navbar style={{ zIndex: +1 }} />
				<div>
					<AlertUI />
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/dataentry"
							element={
								<PrivateRoute>
									<DataEntryRO />
								</PrivateRoute>
							}
						/>
						<Route
							path="/prediction"
							element={
								<PrivateRoute>
									<DataEntryDO />
								</PrivateRoute>
							}
						/>
						<Route
							path="/dashboard"
							element={
								<PrivateRoute>
									<Dashboard />
								</PrivateRoute>
							}
						/>
						<Route
							path="/visualise"
							element={
								<PrivateRoute>
									<Visualization />
								</PrivateRoute>
							}
						/>
						<Route
							path="/admin"
							element={
								<PrivateRoute>
									<AdminRoute>
										<AdminPanel />
									</AdminRoute>
								</PrivateRoute>
							}
						/>
						<Route
							path="/logout"
							element={
								<PrivateRoute>
									<Logout />
								</PrivateRoute>
							}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			</ThemeProvider>
		</>
	);
}

export default App;
