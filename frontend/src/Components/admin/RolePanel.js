import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { GR_URL, ROLE_URL } from "../../constants";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const RolePanel = (props) => {
	const { addrole, updaterole, deleterole } = useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [roleState, setRoleState] = useState({
		searchrole: "",
		rolelist: [],
		error: "",
		rolenametest: "",
		update: 1,
	});

	const [openRoleAdd, setOpenRoleAdd] = useState(false);
	const [openRoleUpdate, setOpenRoleUpdate] = useState(false);
	const [openRoleDelete, setOpenRoleDelete] = useState(false);
	const [focusRole, setFocusRole] = useState();

	const [addRole, setAddRole] = useState({
		rolename: "",
		roledescription: "",
		roleimg: "",
	});

	const [updateRole, setUpdateRole] = useState({
		roleid: "",
		rolename: "",
		roledescription: "",
		roleimg: "",
	});

	// SEARCH ROLE
	const handleSearchRole = (e) => {
		const { id, value } = e.target;
		setRoleState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	// ADD ROLE
	const handleRoleAddChange = (e) => {
		const { id, value } = e.target;
		setAddRole((prevAddRole) => ({
			...prevAddRole,
			[id]: value,
		}));
	};

	const handleRoleAddOpen = () => {
		setOpenRoleAdd(true);
	};

	const handleRoleAddClose = () => {
		setOpenRoleAdd(false);
		setAddRole((prevAddRole) => ({
			rolename: "",
			roledescription: "",
			roleimg: "",
		}));
		setRoleState((prevRoleState) => ({
			...prevRoleState,
			error: "",
		}));
	};

	const handleAddRole = () => {
		if (addRole.rolename === "") {
			setRoleState((prevRoleState) => ({
				...prevRoleState,
				error: "Role Name field should not be empty.",
			}));
		} else {
			addrole(
				addRole.rolename.toUpperCase(),
				addRole.roledescription,
				addRole.roleimg
			);
			setRoleState((prevRoleState) => ({
				...prevRoleState,
				error: "",
				rolenametest: "",
				update: prevRoleState.update + 1,
			}));
			setOpenRoleAdd(false);
			setAddRole((prevAddUser) => ({
				rolename: "",
				roledescription: "",
				roleimg: "",
			}));
		}
	};

	// UPDATE ROLE
	const handleRoleUpdateOpen = (rolename) => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${ROLE_URL}${rolename}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateRole({
						roleid: response.data.id,
						rolename: response.data.name,
						roledescription: response.data.description,
						roleimg: response.data.img,
					});
					console.log(response.data);
				}
			})
			.catch(function (error) {
				if (error.response) {
					console.log("error");
				}
			});
		setOpenRoleUpdate(true);
		setRoleState((prevRoleState) => ({
			...prevRoleState,
			update: prevRoleState.update + 1,
		}));
		setFocusRole(rolename);
	};

	const handleRoleUpdateClose = () => {
		setOpenRoleUpdate(false);
		setFocusRole();
	};

	const handleRoleUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateRole((prevRole) => ({
			...prevRole,
			[id]: value,
		}));
	};

	const handleRoleUpdate = () => {
		if (updateRole.rolename === "") {
			setRoleState((prevRoleState) => ({
				...prevRoleState,
				error: "Role Name field should not be empty.",
			}));
		} else {
			updaterole(
				updateRole.roleid,
				updateRole.rolename,
				updateRole.roledescription,
				updateRole.roleimg
			);

			setFocusRole();
			setOpenRoleUpdate(false);
			setRoleState((prevRoleState) => ({
				...prevRoleState,
				error: "",
				update: prevRoleState.update + 1,
			}));
			setUpdateRole((prevRole) => ({
				...prevRole,
				roleid: "",
				rolename: "",
				roledescription: "",
				roleimg: "",
			}));
		}
	};

	// DELETE ROLE
	const handleRoleDelete = (rolename) => {
		deleterole(rolename);
		setOpenRoleDelete(false);
		setFocusRole();
		setRoleState((prevRoleState) => ({
			...prevRoleState,
			update: prevRoleState.update + 1,
		}));
	};

	const handleRoleDeleteOpen = (rolename) => {
		setOpenRoleDelete(true);
		setFocusRole(rolename);
	};

	const handleRoleDeleteClose = () => {
		setOpenRoleDelete(false);
		setFocusRole();
		setRoleState((prevRoleState) => ({
			...prevRoleState,
			rolenametest: "",
		}));
	};

	const handleRoleDeleteChange = (e) => {
		const { id, value } = e.target;
		setRoleState((prevRoleState) => ({
			...prevRoleState,
			[id]: value,
		}));
	};

	// LOAD ROLES AT RELOAD
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${GR_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setRoleState((prevRoleState) => ({
						...prevRoleState,
						rolelist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setRoleState((prevRoleState) => ({
						...prevRoleState,
						rolelist: [],
						error: "Roles Not Loaded.",
					}));
				}
			});

		console.log(roleState.rolelist);
	}, [roleState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openRole}
				onClose={props.handleRoleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="warning">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleRoleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Roles
						</Typography>
						<Button autoFocus color="inherit" onClick={props.handleRoleClose}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleRoleAddOpen}
					>
						Add Role
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchrole"
							placeholder="Search Role"
							value={roleState.searchrole}
							onChange={handleSearchRole}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{roleState.rolelist
							.filter((val) => {
								if (roleState.searchrole === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(roleState.searchrole.toLowerCase())
								) {
									return val;
								}
							})
							.map((role) => (
								<div className="col-md-3">
									<center>
										<Card className="mb-2" sx={{ maxWidth: 300 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={role.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{role.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{role.description}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleRoleUpdateOpen(role.name);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleRoleDeleteOpen(role.name);
													}}
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</CardActions>
										</Card>
									</center>
								</div>
							))}
					</div>
				</div>
			</Dialog>

			{/* ----------------------------------------------------------------- ADD ROLE ----------------------------------------------------------------- */}
			<Dialog open={openRoleAdd} onClose={handleRoleAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Role</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new role, enter all the details in the form.
						<br />
						Role Name should start with '
						<small>
							<strong>ROLE_</strong>
						</small>
						'.{" "}
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="rolename">Role Name</label>
							<input
								id="rolename"
								label="Role Name"
								type="text"
								value={addRole.rolename}
								onChange={handleRoleAddChange}
								className="form-control"
								placeholder="Enter Role Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="roledescription">Role Description</label>
							<input
								id="roledescription"
								label="Role Description"
								type="text"
								value={addRole.roledescription}
								onChange={handleRoleAddChange}
								className="form-control"
								placeholder="Enter Role Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="roleimg">Role Image</label>
							<input
								id="roleimg"
								label="Role Image"
								type="text"
								value={addRole.roleimg}
								onChange={handleRoleAddChange}
								className="form-control"
								placeholder="Enter Role Image"
							/>
						</div>
						{roleState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{roleState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRoleAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddRole}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE ROLE ----------------------------------------------------------- */}
			<Dialog open={openRoleUpdate} onClose={handleRoleUpdateClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Update Role</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Role.</p>
					<form>
						<div className="form-group mt-2">
							<label for="roleid">Role ID</label>
							<input
								id="roleid"
								label="Role ID"
								type="text"
								value={updateRole.roleid}
								onChange={handleRoleUpdateChange}
								className="form-control"
								placeholder="Enter Role ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rolename">Role Name</label>
							<input
								id="rolename"
								label="Role Name"
								type="text"
								value={updateRole.rolename}
								onChange={handleRoleUpdateChange}
								className="form-control"
								placeholder="Enter Role Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="roledescription">Role Description</label>
							<input
								id="roledescription"
								label="Role Description"
								type="text"
								value={updateRole.roledescription}
								onChange={handleRoleUpdateChange}
								className="form-control"
								placeholder="Enter Role Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="roleimg">Role Image</label>
							<input
								id="roleimg"
								label="Role Image"
								type="text"
								value={updateRole.roleimg}
								onChange={handleRoleUpdateChange}
								className="form-control"
								placeholder="Enter Role Image"
							/>
						</div>
						{roleState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{roleState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRoleUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleRoleUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE ROLE ----------------------------------------------------------- */}
			<Dialog
				open={openRoleDelete}
				onClose={handleRoleDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusRole}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="rolenametest"
						label="Enter the Role Name to confirm the action"
						variant="outlined"
						type="text"
						value={roleState.rolenametest}
						onChange={handleRoleDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRoleDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={roleState.rolenametest !== focusRole}
						onClick={() => {
							handleRoleDelete(focusRole);
						}}
						autoFocus
						startIcon={<DeleteIcon />}
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default RolePanel;
