import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Grid, Avatar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginLogo from "../../Assets/img/login8.svg";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../../Contexts/AuthContext";
import { DrawerContext } from "../../Contexts/DrawerContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Footer from "../layout/Footer";

const Login = () => {
	const { login, isAuthenticated, loading } = useContext(AuthContext);
	const { setPathName } = useContext(DrawerContext);
	const [state, setState] = useState({
		username: "",
		password: "",
	});
	const [errorState, setErrorState] = useState({
		username: {
			error: false,
			msg: "",
		},
		password: {
			error: false,
			msg: "",
		},
	});

	React.useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const handleChange = (e) => {
		const { id, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleSubmitClick = (e) => {
		e.preventDefault();

		if (state.username === "" && state.password === "") {
			setErrorState((prevErrorState) => ({
				...prevErrorState,
				username: {
					error: true,
					msg: "Username Field should not be empty.",
				},
				password: {
					error: true,
					msg: "Password Field should not be empty.",
				},
			}));
		} else if (state.username === "" || state.password === "") {
			if (state.username === "") {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					username: {
						error: true,
						msg: "Username Field should not be empty.",
					},
					password: {
						error: false,
						msg: "",
					},
				}));
			}
			if (state.password === "") {
				setErrorState((prevErrorState) => ({
					...prevErrorState,
					username: {
						error: false,
						msg: "",
					},
					password: {
						error: true,
						msg: "Password Field should not be empty.",
					},
				}));
			}
		} else {
			login(state.username, state.password);
			setErrorState((prevErrorState) => ({
				...prevErrorState,
				username: {
					error: false,
					msg: "",
				},
				password: {
					error: false,
					msg: "",
				},
			}));
		}
	};

	if (isAuthenticated) {
		if (JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_RO")) {
			return <Navigate to="/dataentry" />;
		} else if (
			JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_USER")
		) {
			return <Navigate to="/prediction" />;
		} else {
			return <Navigate to="/admin" />;
		}
	}

	return (
		<>
			<div className="container">
				<div
					className="row align-items-center"
					style={
						isMatch
							? { height: "calc(100vh - 20vh)" }
							: { height: "calc(100vh - 20vh)" }
					}
				>
					{isMatch ? null : (
						<>
							<div className="col text-center">
								<img
									src={LoginLogo}
									alt="Login Logo"
									style={{
										width: "60%",
									}}
								/>
							</div>
						</>
					)}

					<div className="col">
						<center>
							<div className="card" style={isMatch ? null : { width: "65%" }}>
								<div className="card-body">
									<Grid align="center">
										<Avatar style={{ backgroundColor: "#2196F3" }}>
											<AccountCircleIcon />
										</Avatar>
										<h2>Login</h2>
									</Grid>
									<Grid align="left">
										<div className="form-group mt-5">
											<label for="username">Username</label>
											<input
												className={
													errorState.username.error
														? "form-control is-invalid"
														: "form-control"
												}
												type="text"
												placeholder="Enter Username"
												value={state.username}
												onChange={handleChange}
												id="username"
												fullWidth
											/>
											<div class="invalid-feedback">
												<small>{errorState.username["msg"]}</small>
											</div>
										</div>
										<div className="form-group mt-4">
											<label for="password">Password</label>
											<input
												className={
													errorState.password.error
														? "form-control is-invalid"
														: "form-control"
												}
												type="password"
												value={state.password}
												onChange={handleChange}
												id="password"
												placeholder="Enter Password"
											/>
											<div class="invalid-feedback">
												<small>{errorState.password["msg"]}</small>
											</div>
										</div>
									</Grid>
									<center>
										<LoadingButton
											className="mt-4"
											onClick={handleSubmitClick}
											loading={loading}
											loadingPosition="start"
											startIcon={<LoginIcon />}
											color="primary"
											align="center"
											variant="contained"
											size="large"
										>
											Login
										</LoadingButton>
									</center>
								</div>
							</div>
						</center>
					</div>
				</div>
			</div>
			<div
				style={{
					position: "fixed",
					left: 0,
					bottom: 0,
					right: 0,
				}}
			>
				<Footer />
			</div>
		</>
	);
};

export default Login;
