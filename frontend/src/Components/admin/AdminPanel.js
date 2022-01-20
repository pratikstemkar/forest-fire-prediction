import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
	API_URL,
	AU_URL,
	USER_URL,
	GR_URL,
	GRANGE_URL,
	GDIV_URL,
} from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AttractionsIcon from "@mui/icons-material/Attractions";
import BalconyIcon from "@mui/icons-material/Balcony";
import PetsIcon from "@mui/icons-material/Pets";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import RolePanel from "./RolePanel";
import RangePanel from "./RangePanel";
import DivisionPanel from "./DivisionPanel";
import { DrawerContext } from "../../Contexts/DrawerContext";
import SpeciesPanel from "./SpeciesPanel";
import WildlifePanel from "./WildlifePanel";

const AdminPanel = () => {
	const { deleteuser, loading, updateuser, adduser, setAlert } =
		useContext(AuthContext);
	const { setPathName } = useContext(DrawerContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [state, setState] = useState({
		records: [],
		roles: [],
		ranges: [],
		divisions: [],
		search: "",
		error: "",
		update: 0,
	});
	const [open, setOpen] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [openRole, setOpenRole] = useState(false);
	const [openRange, setOpenRange] = useState(false);
	const [openDivision, setOpenDivision] = useState(false);
	const [openSpecies, setOpenSpecies] = useState(false);
	const [openWildlife, setOpenWildlife] = useState(false);
	const [focusUser, setFocusUser] = useState();
	const [user, setUser] = useState({
		userid: "",
		username: "",
		designation: "RO",
		pfp: "",
	});
	const [addUser, setAddUser] = useState({
		username: "",
		password: "",
		cpassword: "",
		designation: "RO",
		pfp: "",
	});

	// LOAD USERS IN TABLE
	useEffect(() => {
		axios
			.get(`${API_URL}${AU_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						records: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						records: [],
						error: "Users Not Loaded.",
					}));
				}
			});
		console.log(state.records);
	}, [state.update]);

	const handleRefresh = () => {
		axios
			.get(`${API_URL}${AU_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						records: response.data,
						error: "",
					}));
					setAlert("Table Refreshed!", "success");
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						records: [],
						error: "Users Not Loaded.",
					}));
					setAlert("Users Not Loaded.", "error");
				}
			});
		console.log(state.records);
	};

	useEffect(() => {
		axios
			.get(`${API_URL}${GR_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						roles: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						roles: [],
						error: "Roles Not Loaded.",
					}));
				}
			});

		console.log(state.roles);

		axios
			.get(`${API_URL}${GRANGE_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						ranges: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						ranges: [],
						error: "Ranges not Loaded.",
					}));
				}
			});

		console.log(state.ranges);

		axios
			.get(`${API_URL}${GDIV_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						divisions: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						divisions: [],
						error: "Divisions not Loaded.",
					}));
				}
			});

		console.log(state.divisions);
	}, []);

	useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	// Roles
	const handleRoleOpen = () => {
		setOpenRole(true);
	};

	const handleRoleClose = () => {
		setOpenRole(false);
	};

	// Ranges
	const handleRangeOpen = () => {
		setOpenRange(true);
	};

	const handleRangeClose = () => {
		setOpenRange(false);
	};

	// Divisions
	const handleDivisionOpen = () => {
		setOpenDivision(true);
	};

	const handleDivisionClose = () => {
		setOpenDivision(false);
	};

	// Species
	const handleSpeciesOpen = () => {
		setOpenSpecies(true);
	};

	const handleSpeciesClose = () => {
		setOpenSpecies(false);
	};

	// Wildlife
	const handleWildlifeOpen = () => {
		setOpenWildlife(true);
	};

	const handleWildlifeClose = () => {
		setOpenWildlife(false);
	};

	// UPDATE USER
	const handleClickOpen = (username) => {
		axios.get(`${API_URL}${USER_URL}${username}`).then(function (response) {
			if (response.status === 200) {
				setUser((prevUser) => ({
					...prevUser,
					userid: response.data.id,
					username: response.data.username,
					range: response.data.range.name,
					division: response.data.division.name,
					designation: response.data.designation,
					pfp: response.data.pfp,
				}));
				console.log(response.data);
			} else {
				console.log("error");
			}
		});
		setOpen(true);
		setState((prevState) => ({
			...prevState,
			update: prevState.update + 1,
		}));
		setFocusUser(username);
	};

	const handleClose = () => {
		setOpen(false);
		setFocusUser();
	};

	const handleClickChange = (e) => {
		const { id, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[id]: value,
		}));
	};

	const handleRangeSelectChange = (e) => {
		setUser((prevUser) => ({
			...prevUser,
			range: e.target.value,
		}));
	};

	const handleDivisionSelectChange = (e) => {
		setUser((prevUser) => ({
			...prevUser,
			division: e.target.value,
		}));
	};

	const handleSelectChange = (e) => {
		setUser((prevUser) => ({
			...prevUser,
			designation: e.target.value,
		}));
	};

	const handleUserUpdate = () => {
		if (user.range === "") {
			setState((prevState) => ({
				...prevState,
				error: "Range field should not be empty.",
			}));
		} else if (user.division === "") {
			setState((prevState) => ({
				...prevState,
				error: "Division field should not be empty.",
			}));
		} else if (user.designation === "") {
			setState((prevState) => ({
				...prevState,
				error: "Designation field should not be empty.",
			}));
		} else {
			updateuser(
				user.username,
				user.range,
				user.division,
				user.designation,
				user.pfp
			);

			setFocusUser();
			setOpen(false);
			setState((prevState) => ({
				...prevState,
				error: "",
				update: prevState.update + 1,
			}));
		}
	};

	// SEARCH USER
	const handleSearch = (e) => {
		const { id, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	// DELETE USER
	const handleDeleteUser = (username) => {
		deleteuser(username);
		setOpenDelete(false);
		setFocusUser();
		setState((prevState) => ({
			...prevState,
			update: prevState.update + 1,
		}));
	};

	const handleDeleteOpen = (username) => {
		setOpenDelete(true);
		setFocusUser(username);
	};

	const handleDeleteClose = () => {
		setOpenDelete(false);
		setFocusUser();
	};

	// USER ADD
	const handleAddChange = (e) => {
		const { id, value } = e.target;
		setAddUser((prevUser) => ({
			...prevUser,
			[id]: value,
		}));
	};

	const handleAddSelectChange = (e) => {
		setAddUser((prevAddUser) => ({
			...prevAddUser,
			designation: e.target.value,
		}));
	};

	const handleAddDivSelectChange = (e) => {
		setAddUser((prevAddUser) => ({
			...prevAddUser,
			division: e.target.value,
		}));
	};

	const handleAddRangeSelectChange = (e) => {
		setAddUser((prevAddUser) => ({
			...prevAddUser,
			range: e.target.value,
		}));
	};

	const handleAddOpen = () => {
		setOpenAdd(true);
	};

	const handleAddClose = () => {
		setOpenAdd(false);
		setAddUser((prevAddUser) => ({
			username: "",
			password: "",
			cpassword: "",
			range: "Gangtok",
			division: "East Territorial",
			designation: "RO",
		}));
		setState((prevState) => ({
			...prevState,
			error: "",
		}));
	};

	const handleAddUser = () => {
		if (addUser.username === "") {
			setState((prevState) => ({
				...prevState,
				error: "Username field should not be empty.",
			}));
		} else if (addUser.password === "") {
			setState((prevState) => ({
				...prevState,
				error: "Password field should not be empty.",
			}));
		} else if (addUser.password !== addUser.cpassword) {
			setState((prevState) => ({
				...prevState,
				error: "Password values do not match.",
			}));
		} else if (addUser.range === "") {
			setState((prevState) => ({
				...prevState,
				error: "Range field should not be empty.",
			}));
		} else if (addUser.division === "") {
			setState((prevState) => ({
				...prevState,
				error: "Division field should not be empty.",
			}));
		} else if (addUser.designation === "") {
			setState((prevState) => ({
				...prevState,
				error: "Designation field should not be empty.",
			}));
		} else {
			console.log(addUser.designation);

			adduser(
				addUser.username,
				addUser.password,
				addUser.range,
				addUser.division,
				addUser.designation,
				addUser.pfp
			);
			console.log(addUser.username);

			setOpenAdd(false);

			setState((prevState) => ({
				...prevState,
				error: "",
				update: prevState.update + 1,
			}));

			setAddUser((prevAddUser) => ({
				username: "",
				password: "",
				cpassword: "",
				range: "Gangtok",
				division: "East Territorial",
				designation: "RO",
				pfp: "",
			}));
		}
	};

	return (
		<>
			<div className="container">
				<div className="mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleAddOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Add User
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button
						color="warning"
						startIcon={<AssignmentIndIcon />}
						variant="contained"
						onClick={handleRoleOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Roles
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button
						color="secondary"
						startIcon={<AttractionsIcon />}
						variant="contained"
						onClick={handleRangeOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Ranges
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button
						color="primary"
						startIcon={<BalconyIcon />}
						variant="contained"
						onClick={handleDivisionOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Divisions
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button
						color="error"
						startIcon={<EmojiNatureIcon />}
						variant="contained"
						onClick={handleSpeciesOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Species
					</Button>
					&nbsp;&nbsp;&nbsp;
					<Button
						color="success"
						startIcon={<PetsIcon />}
						variant="contained"
						onClick={handleWildlifeOpen}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						Wildlife
					</Button>
					&nbsp;&nbsp;&nbsp;
					<IconButton
						aria-label="delete"
						onClick={handleRefresh}
						className="mb-2"
						size={isMatch ? "small" : "large"}
					>
						<RefreshIcon color="primary" />
					</IconButton>
				</div>

				<div>
					<input
						className="form-control form-control-lg"
						type="text"
						id="search"
						placeholder="Search Username"
						value={state.search}
						onChange={handleSearch}
					/>
				</div>

				<div className="mt-2">
					<table className="table table-bordered table-hover">
						<thead>
							<tr className="table-secondary">
								<th scope="col" className="text-center">
									ID
								</th>
								{isMatch ? null : (
									<th scope="col" className="text-center">
										Profile Picture
									</th>
								)}
								<th scope="col" className="text-center">
									Username
								</th>
								<th scope="col" className="text-center">
									Role
								</th>
								<th scope="col" className="text-center">
									Operation
								</th>
							</tr>
						</thead>
						<tbody>
							{state.records
								.filter((val) => {
									if (state.search === "") {
										return val;
									} else if (
										val.username
											.toLowerCase()
											.includes(state.search.toLowerCase())
									) {
										return val;
									}
								})
								.map((user) => (
									<tr key={user.id}>
										<th scope="row" className="text-center">
											{user.id}
										</th>
										{isMatch ? null : (
											<td className="text-center">
												<center>
													<Avatar
														src={user.pfp}
														sx={{ width: 60, height: 60 }}
													></Avatar>
												</center>
											</td>
										)}
										<td className="text-center">{user.username}</td>
										<td className="text-center">{user.designation}</td>
										<td className="text-center">
											<IconButton
												aria-label="update"
												size="large"
												color="primary"
												onClick={() => {
													handleClickOpen(user.username);
												}}
											>
												<CreateIcon fontSize="small" />
											</IconButton>{" "}
											<IconButton
												aria-label="delete"
												size="large"
												color="error"
												onClick={() => {
													handleDeleteOpen(user.username);
												}}
											>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				{/* ------------------------------------------------------SAVE USER---------------------------------------------------------------- */}
				<Dialog open={openAdd} onClose={handleAddClose} fullWidth>
					<DialogTitle>
						<h4>
							<b>Add User</b>
						</h4>
					</DialogTitle>
					<DialogContent>
						<p className="text-muted">
							To add a new user, enter all the details in the form.
						</p>
						<form>
							<div class="form-group mt-2">
								<label for="username">Username</label>
								<input
									type="text"
									class="form-control"
									id="username"
									value={addUser.username}
									onChange={handleAddChange}
									placeholder="Enter Username"
								/>
							</div>
							<div class="form-group mt-2">
								<label for="password">Password</label>
								<input
									type="password"
									class="form-control"
									id="password"
									value={addUser.password}
									onChange={handleAddChange}
									placeholder="Enter Password"
								/>
							</div>
							<div class="form-group mt-2">
								<label for="cpassword">Confirm Password</label>
								<input
									type="password"
									class="form-control"
									id="cpassword"
									value={addUser.cpassword}
									onChange={handleAddChange}
									placeholder="Confirm Password"
								/>
							</div>
							<div class="form-group mt-2">
								<label for="designation">Designation</label>
								<select
									type="text"
									class="form-control"
									id="designation"
									value={addUser.designation}
									onChange={handleAddSelectChange}
								>
									{state.roles.map((role) => {
										return (
											<option value={role.name.substring(5, role.name.length)}>
												{role.name.substring(5, role.name.length)}
											</option>
										);
									})}
								</select>
							</div>
							<div class="form-group mt-2">
								<label for="pfp">Profile Picture</label>
								<input
									type="text"
									class="form-control"
									id="pfp"
									value={addUser.pfp}
									onChange={handleAddChange}
									placeholder="Enter Image Link"
								/>
								<small className="form-text">
									Profile Picture will be added only if the URL returns a valid
									image.
								</small>
							</div>
							{state.error.length > 0 ? (
								<Alert severity="error" className="mt-2">
									{state.error}
								</Alert>
							) : null}
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleAddClose} variant="outlined" color="primary">
							Cancel
						</Button>
						<LoadingButton
							color="success"
							onClick={handleAddUser}
							loading={loading}
							loadingPosition="start"
							startIcon={<SaveIcon />}
							variant="contained"
						>
							Save User
						</LoadingButton>
					</DialogActions>
				</Dialog>

				{/* ---------------------------------------------------UPDATE USER------------------------------------------------------------------ */}
				<Dialog open={open} onClose={handleClose} fullWidth>
					<DialogTitle>
						<h4>
							<b>Update User</b>
						</h4>
					</DialogTitle>
					<DialogContent>
						<p className="text-muted">Update the Details of the User.</p>
						<form>
							<div class="form-group mt-2">
								<label for="userid">User ID</label>
								<input
									type="text"
									class="form-control"
									id="userid"
									value={user.userid}
									onChange={handleClickChange}
									disabled
								/>
							</div>
							<div class="form-group mt-2">
								<label for="username">Username</label>
								<input
									type="text"
									class="form-control"
									id="username"
									value={user.username}
									onChange={handleClickChange}
									disabled
								/>
							</div>
							<div class="form-group mt-2">
								<label for="designation">Designation</label>
								<select
									type="text"
									class="form-control"
									id="designation"
									value={user.designation}
									onChange={handleSelectChange}
								>
									{state.roles.map((role) => {
										return (
											<option
												key={role.id}
												value={role.name.substring(5, role.name.length)}
											>
												{role.name.substring(5, role.name.length)}
											</option>
										);
									})}
								</select>
							</div>
							<div class="form-group mt-2">
								<label for="pfp">Profile Picture</label>
								<input
									type="text"
									class="form-control"
									id="pfp"
									value={user.pfp}
									onChange={handleClickChange}
									placeholder="Enter Division"
								/>
								<small className="form-text">
									Profile Picture will be updated only if the URL returns a
									valid image.
								</small>
							</div>
							{state.error.length > 0 ? (
								<Alert severity="error" className="mt-2">
									{state.error}
								</Alert>
							) : null}
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} variant="outlined" color="primary">
							Cancel
						</Button>
						<LoadingButton
							color="success"
							onClick={handleUserUpdate}
							loading={loading}
							loadingPosition="start"
							startIcon={<SaveIcon />}
							variant="contained"
						>
							Save Changes
						</LoadingButton>
					</DialogActions>
				</Dialog>

				{/* -------------------------------------------------------DELETE USER--------------------------------------------- */}
				<Dialog
					open={openDelete}
					onClose={handleDeleteClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{`Delete ${focusUser}?`}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							This action is permanent and cannot be undone. Decide cautiously.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleDeleteClose}
							color="primary"
							variant="outlined"
						>
							Cancel
						</Button>
						<Button
							color="error"
							onClick={() => {
								handleDeleteUser(focusUser);
							}}
							autoFocus
							startIcon={<DeleteIcon />}
							variant="contained"
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>

				{/* ----------------------- PANELS -------------------------------- */}
				<RolePanel
					openRole={openRole}
					handleRoleOpen={handleRoleOpen}
					handleRoleClose={handleRoleClose}
					loading={loading}
				/>
				<RangePanel
					openRange={openRange}
					handleRangeOpen={handleRangeOpen}
					handleRangeClose={handleRangeClose}
				/>
				<DivisionPanel
					openDivision={openDivision}
					handleDivisionOpen={handleDivisionOpen}
					handleDivisionClose={handleDivisionClose}
				/>
				<SpeciesPanel
					openSpecies={openSpecies}
					handleSpeciesOpen={handleSpeciesOpen}
					handleSpeciesClose={handleSpeciesClose}
				/>
				<WildlifePanel
					openWildlife={openWildlife}
					handleWildlifeOpen={handleWildlifeOpen}
					handleWildlifeClose={handleWildlifeClose}
				/>
			</div>
		</>
	);
};

export default AdminPanel;
