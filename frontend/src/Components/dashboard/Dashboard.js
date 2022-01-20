import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CreateIcon from "@mui/icons-material/Create";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DrawerContext } from "../../Contexts/DrawerContext";
import { AuthContext } from "../../Contexts/AuthContext";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
	const { user, changepassword, changeusername, changepfp, loading, logout } =
		useContext(AuthContext);
	const { setPathName } = useContext(DrawerContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const handleEmpty = () => {};

	const [state, setState] = useState({
		error: "",
	});

	React.useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	// CHANGE PASSWORD
	const [pass, setPass] = useState({
		opassword: "",
		npassword: "",
		cpassword: "",
		open: false,
	});

	const handlePassOpen = () => {
		setPass((prevPass) => ({
			...prevPass,
			open: true,
		}));
	};

	const handlePassClose = () => {
		setPass({
			opassword: "",
			npassword: "",
			cpassword: "",
			open: false,
		});
		setState((prevState) => ({
			...prevState,
			error: "",
		}));
	};

	const handlePassChange = (e) => {
		const { id, value } = e.target;
		setPass((prevPass) => ({
			...prevPass,
			[id]: value,
		}));
	};

	const handlePassSubmit = () => {
		if (pass.opassword === "") {
			setState((prevState) => ({
				...prevState,
				error: "Current Password field should not be empty.",
			}));
		} else if (pass.npassword === "") {
			setState((prevState) => ({
				...prevState,
				error: "New Password field should not be empty.",
			}));
		} else if (pass.cpassword !== pass.npassword) {
			setState((prevState) => ({
				...prevState,
				error: "New Password values do not match.",
			}));
		} else if (pass.opassword === pass.npassword) {
			setState((prevState) => ({
				...prevState,
				error: "Current Password and New Password could not be same.",
			}));
		} else {
			changepassword(user.username, pass.opassword, pass.npassword);
			setState((prevState) => ({
				...prevState,
				error: "",
			}));
			setPass({
				opassword: "",
				password: "",
				cpassword: "",
				open: false,
			});
		}
	};

	// CHANGE USERNAME
	const [usern, setUsern] = useState({
		nusername: "",
		open: false,
	});

	const handleUsernOpen = () => {
		setUsern((prevUsern) => ({
			...prevUsern,
			open: true,
		}));
	};

	const handleUsernClose = () => {
		setUsern({
			nusername: "",
			open: false,
		});
		setState((prevState) => ({
			...prevState,
			error: "",
		}));
	};

	const handleUsernChange = (e) => {
		const { id, value } = e.target;
		setUsern((prevUsern) => ({
			...prevUsern,
			[id]: value,
		}));
	};

	const handleUsernSubmit = () => {
		if (usern.nusername === "") {
			setState((prevState) => ({
				...prevState,
				error: "Current Username field should not be empty.",
			}));
		} else if (user.username === usern.nusername) {
			setState((prevState) => ({
				...prevState,
				error: "Current Username and New Username should not be same.",
			}));
		} else {
			changeusername(user.access_token, usern.nusername);
			let userObj = JSON.parse(localStorage.getItem("user"));
			userObj.username = usern.nusername;
			localStorage.setItem("user", JSON.stringify(userObj));
			setState((prevState) => ({
				...prevState,
				error: "",
			}));
			setPass({
				nusername: "",
				open: false,
			});
			logout();
		}
	};

	// CHANGE PFP
	const [pfpChange, setPfpChange] = useState({
		pfp: "",
		open: false,
	});

	const handlePfpChangeOpen = () => {
		setPfpChange((prevPfpChange) => ({
			...prevPfpChange,
			open: true,
		}));
	};

	const handlePfpChangeClose = () => {
		setPfpChange({
			pfp: "",
			open: false,
		});
		setState((prevState) => ({
			...prevState,
			error: "",
		}));
	};

	const handlePfpChangeChange = (e) => {
		const { id, value } = e.target;
		setPfpChange((prevPfpChange) => ({
			...prevPfpChange,
			[id]: value,
		}));
	};

	const handlePfpChangeSubmit = () => {
		if (pfpChange.pfp === "") {
			setState((prevState) => ({
				...prevState,
				error: "Profile Picture field should not be empty.",
			}));
		} else {
			changepfp(user.username, pfpChange.pfp);
			setState((prevState) => ({
				...prevState,
				error: "",
			}));
			setPfpChange({
				pfp: "",
				open: false,
			});
		}
	};

	return (
		<>
			<div className="container">
				<div className="row mt-4">
					{isMatch ? (
						<center>
							<div className="col-md-2 align-self-center">
								<Avatar
									sx={{ width: 200, height: 200 }}
									src={user.pfp}
								></Avatar>
							</div>
							<div className="col-md-4 align-self-center">
								<h1 className="">{user.username}</h1>
								<p>{user.division}</p>
								<Chip
									color="success"
									avatar={
										<Avatar sx={{ bgcolor: "#72CC50" }}>
											{user.roles.substring(6, 8)}
										</Avatar>
									}
									label={user.roles.substring(6, user.roles.length - 1)}
									onClick={handleEmpty}
								/>
							</div>
						</center>
					) : (
						<>
							<div className="col-md-2 align-self-center">
								<Avatar
									sx={{ width: 200, height: 200 }}
									src={user.pfp}
								></Avatar>
							</div>
							<div className="col-md-4 align-self-center">
								<h1 className="">{user.username}</h1>
								<p>{user.division}</p>
								<Chip
									color="success"
									avatar={
										<Avatar sx={{ bgcolor: "#72CC50" }}>
											{user.roles.substring(6, 8)}
										</Avatar>
									}
									label={user.roles.substring(6, user.roles.length - 1)}
									onClick={handleEmpty}
								/>
							</div>
						</>
					)}
				</div>
				<div className="row mt-4 mb-4 align-items-center">
					<div className="col-md-3 mb-2 text-center">
						<center>
							<Card sx={{ maxWidth: 300 }}>
								<CardActionArea onClick={handlePassOpen}>
									<CardMedia
										component="img"
										height="140"
										image="https://picsum.photos/id/103/500/500"
										alt="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Change Password
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Change Password of the Account.
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</center>
					</div>
					<div className="col-md-3 mb-2 text-center">
						<center>
							<Card sx={{ maxWidth: 300 }}>
								<CardActionArea onClick={handleUsernOpen}>
									<CardMedia
										component="img"
										height="140"
										image="https://picsum.photos/id/338/500/500"
										alt="green iguana"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Change Username
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Change Username of the Account.
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</center>
					</div>
					<div className="col-md-3 mb-2 text-center">
						<center>
							<Card sx={{ maxWidth: 300 }}>
								<CardActionArea onClick={handlePfpChangeOpen}>
									<CardMedia
										component="img"
										height="140"
										image={user.pfp}
										alt="PFP Card"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="div">
											Change Profile Picture
										</Typography>
										<Typography variant="body2" color="text.secondary">
											Change Profile Picture of the Account.
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</center>
					</div>
				</div>

				{/* ------------------------------------------ CHANGE PASSWORD --------------------------------------------- */}
				<Dialog open={pass.open} onClose={handlePassClose} fullWidth>
					<DialogTitle>
						<h4>
							<b>Change Password</b>
						</h4>
					</DialogTitle>
					<DialogContent>
						<p className="text-muted">
							To change the password of your account, enter the current password
							and the new password.
						</p>
						<form>
							<div class="form-group mt-2">
								<label for="opassword">Current Password</label>
								<input
									type="password"
									class="form-control"
									id="opassword"
									placeholder="Current Password"
									value={pass.opassword}
									onChange={handlePassChange}
								/>
							</div>
							<div class="form-group mt-2">
								<label for="npassword">New Password</label>
								<input
									type="password"
									class="form-control"
									id="npassword"
									placeholder="New Password"
									value={pass.npassword}
									onChange={handlePassChange}
								/>
							</div>
							<div class="form-group mt-2">
								<label for="cpassword">Confirm Password</label>
								<input
									type="password"
									class="form-control"
									id="cpassword"
									placeholder="Confirm Password"
									value={pass.cpassword}
									onChange={handlePassChange}
								/>
							</div>
						</form>
						{state.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{state.error}
							</Alert>
						) : null}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handlePassClose}
							variant="outlined"
							color="primary"
						>
							Cancel
						</Button>
						<LoadingButton
							color="success"
							onClick={handlePassSubmit}
							loading={loading}
							loadingPosition="start"
							startIcon={<CreateIcon />}
							variant="contained"
						>
							Change Password
						</LoadingButton>
					</DialogActions>
				</Dialog>

				{/* ------------------------------------- CHANGE USERNAME ----------------------------------------------------- */}
				<Dialog open={usern.open} onClose={handleUsernClose}>
					<DialogTitle>
						<h4>
							<b>Change Username</b>
						</h4>
					</DialogTitle>
					<DialogContent>
						<p className="text-muted">
							To change the username of your account, enter the new username.{" "}
							<br />
							<span className="text-danger">
								You will be redirected to the Login Page.
							</span>
						</p>
						<form>
							<div class="form-group mt-2">
								<label for="nusername">New Username</label>
								<input
									type="text"
									class="form-control"
									id="nusername"
									placeholder="Enter New Username"
									value={usern.nusername}
									onChange={handleUsernChange}
								/>
							</div>
						</form>
						{state.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{state.error}
							</Alert>
						) : null}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleUsernClose}
							variant="outlined"
							color="primary"
						>
							Cancel
						</Button>
						<LoadingButton
							color="success"
							onClick={handleUsernSubmit}
							loading={loading}
							loadingPosition="start"
							startIcon={<CreateIcon />}
							variant="contained"
						>
							Change Username
						</LoadingButton>
					</DialogActions>
				</Dialog>

				{/* ------------------------------------- CHANGE PFP ----------------------------------------------------- */}
				<Dialog open={pfpChange.open} onClose={handlePfpChangeClose}>
					<DialogTitle>
						<h4>
							<b>Change Profile Picture</b>
						</h4>
					</DialogTitle>
					<DialogContent>
						<p className="text-muted">
							To change the Profile Picture of your account, enter the new
							picture's URL. <br />
							<span className="text-danger">
								Please Refresh to view changes.
							</span>
						</p>
						<form>
							<div class="form-group mt-2">
								<label for="pfp">Profile Picture</label>
								<input
									type="text"
									class="form-control"
									id="pfp"
									placeholder="Enter Profile Picture URL"
									value={pfpChange.pfp}
									onChange={handlePfpChangeChange}
								/>
							</div>
						</form>
						{state.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{state.error}
							</Alert>
						) : null}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handlePfpChangeClose}
							variant="outlined"
							color="primary"
						>
							Cancel
						</Button>
						<LoadingButton
							color="success"
							onClick={handlePfpChangeSubmit}
							loading={loading}
							loadingPosition="start"
							startIcon={<CreateIcon />}
							variant="contained"
						>
							Change Profile Picture
						</LoadingButton>
					</DialogActions>
				</Dialog>
			</div>
		</>
	);
};

export default Dashboard;
