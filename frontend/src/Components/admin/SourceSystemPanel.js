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
import CreateIcon from "@mui/icons-material/Create";
import Slide from "@mui/material/Slide";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL, GSSYS_URL, SSYS_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const SourceSystemPanel = (props) => {
	const { addsourcesystem, updatesourcesystem, deletesourcesystem } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [SourceSystemState, setSourceSystemState] = useState({
		searchSourceSystem: "",
		SourceSystemlist: [],
		error: "",
		SourceSystemnametest: "",
		update: 1,
	});

	const [openSourceSystemAdd, setOpenSourceSystemAdd] = useState(false);
	const [openSourceSystemUpdate, setOpenSourceSystemUpdate] = useState(false);
	const [openSourceSystemDelete, setOpenSourceSystemDelete] = useState(false);
	const [focusSourceSystem, setFocusSourceSystem] = useState();

	const [addSourceSystem, setAddSourceSystem] = useState({
		SourceSystemname: "",
		SourceSystemtype: "",
		SourceSystemimg: "",
	});

	const [updateSourceSystem, setUpdateSourceSystem] = useState({
		SourceSystemid: "",
		SourceSystemname: "",
		SourceSystemtype: "",
		SourceSystemimg: "",
	});

	// SEARCH SourceSystem
	const handleSearchSourceSystem = (e) => {
		const { id, value } = e.target;
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			[id]: value,
		}));
	};

	// ADD SourceSystem
	const handleSourceSystemAddChange = (e) => {
		const { id, value } = e.target;
		setAddSourceSystem((prevAddSourceSystem) => ({
			...prevAddSourceSystem,
			[id]: value,
		}));
	};

	const handleSourceSystemAddOpen = () => {
		setOpenSourceSystemAdd(true);
	};

	const handleSourceSystemAddClose = () => {
		setOpenSourceSystemAdd(false);
		setAddSourceSystem((prevAddSourceSystem) => ({
			SourceSystemname: "",
			SourceSystemtype: "",
			SourceSystemimg: "",
		}));
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			error: "",
		}));
	};

	const handleAddSourceSystem = () => {
		if (addSourceSystem.SourceSystemname === "") {
			setSourceSystemState((prevSourceSystemState) => ({
				...prevSourceSystemState,
				error: "SourceSystem Name field should not be empty.",
			}));
		} else {
			addsourcesystem(
				addSourceSystem.SourceSystemname,
				addSourceSystem.SourceSystemtype,
				addSourceSystem.SourceSystemimg
			);
			console.log(addSourceSystem.SourceSystemname);
			setSourceSystemState((prevSourceSystemState) => ({
				...prevSourceSystemState,
				error: "",
				update: prevSourceSystemState.update + 1,
			}));
			setOpenSourceSystemAdd(false);
			setAddSourceSystem((prevAddSourceSystem) => ({
				SourceSystemname: "",
				SourceSystemtype: "",
				SourceSystemimg: "",
			}));
		}
	};

	// UPDATE SourceSystem
	const handleSourceSystemUpdateOpen = (SourceSystemname) => {
		axios
			.get(`${API_URL}${SSYS_URL}${SourceSystemname}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateSourceSystem({
						SourceSystemid: response.data.id,
						SourceSystemname: response.data.name,
						SourceSystemtype: response.data.type,
						SourceSystemimg: response.data.img,
					});
					console.log(response.data);
				} else {
					console.log("error");
				}
			});
		setOpenSourceSystemUpdate(true);
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			update: prevSourceSystemState.update + 1,
		}));
		setFocusSourceSystem(SourceSystemname);
	};

	const handleSourceSystemUpdateClose = () => {
		setOpenSourceSystemUpdate(false);
		setFocusSourceSystem();
	};

	const handleSourceSystemUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateSourceSystem((prevSourceSystem) => ({
			...prevSourceSystem,
			[id]: value,
		}));
	};

	const handleSourceSystemUpdate = () => {
		if (updateSourceSystem.SourceSystemname === "") {
			setSourceSystemState((prevSourceSystemState) => ({
				...prevSourceSystemState,
				error: "SourceSystem Name field should not be empty.",
			}));
		} else {
			updatesourcesystem(
				updateSourceSystem.SourceSystemid,
				updateSourceSystem.SourceSystemname,
				updateSourceSystem.SourceSystemtype,
				updateSourceSystem.SourceSystemimg
			);

			setFocusSourceSystem();
			if (!props.loading) {
				setOpenSourceSystemUpdate(false);
			}
			setSourceSystemState((prevSourceSystemState) => ({
				...prevSourceSystemState,
				error: "",
				update: prevSourceSystemState.update + 1,
			}));
		}
	};

	// DELETE SourceSystem
	const handleSourceSystemDelete = (SourceSystemname) => {
		deletesourcesystem(SourceSystemname);
		setOpenSourceSystemDelete(false);
		setFocusSourceSystem();
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			SourceSystemnametest: "",
			update: prevSourceSystemState.update + 1,
		}));
	};

	const handleSourceSystemDeleteOpen = (SourceSystemname) => {
		setOpenSourceSystemDelete(true);
		setFocusSourceSystem(SourceSystemname);
	};

	const handleSourceSystemDeleteClose = () => {
		setOpenSourceSystemDelete(false);
		setFocusSourceSystem();
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			SourceSystemnametest: "",
		}));
	};

	const handleSourceSystemDeleteChange = (e) => {
		const { id, value } = e.target;
		setSourceSystemState((prevSourceSystemState) => ({
			...prevSourceSystemState,
			[id]: value,
		}));
	};

	// LOAD SourceSystem AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GSSYS_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setSourceSystemState((prevSourceSystemState) => ({
						...prevSourceSystemState,
						SourceSystemlist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setSourceSystemState((prevSourceSystemState) => ({
						...prevSourceSystemState,
						SourceSystemlist: [],
						error: "SourceSystem Not Loaded.",
					}));
				}
			});

		console.log(SourceSystemState.SourceSystemlist);
	}, [SourceSystemState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openSourceSystem}
				onClose={props.handleSourceSystemClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="error">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleSourceSystemClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							SourceSystem
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleSourceSystemClose}
						>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleSourceSystemAddOpen}
					>
						Add SourceSystem
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchSourceSystem"
							placeholder="Search SourceSystem"
							value={SourceSystemState.searchSourceSystem}
							onChange={handleSearchSourceSystem}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{SourceSystemState.SourceSystemlist.filter((val) => {
							if (SourceSystemState.searchSourceSystem === "") {
								return val;
							} else if (
								val.name
									.toLowerCase()
									.includes(SourceSystemState.searchSourceSystem.toLowerCase())
							) {
								return val;
							}
						}).map((SourceSystem) => (
							<div className="col-md-3">
								<center>
									<Card
										className="mb-2"
										sx={{
											maxWidth: 300,
										}}
									>
										<CardActionArea>
											<CardMedia
												component="img"
												height="140"
												image={SourceSystem.img}
												alt="green iguana"
											/>
											<CardContent>
												<Typography sx={{ fontSize: 14 }} gutterBottom>
													{SourceSystem.id}
												</Typography>
												<Typography variant="h5" component="div">
													{SourceSystem.name}
												</Typography>
												<Typography variant="body2">
													{SourceSystem.type}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<IconButton
												aria-label="update"
												size="large"
												color="primary"
												onClick={() => {
													handleSourceSystemUpdateOpen(SourceSystem.name);
												}}
											>
												<CreateIcon fontSize="small" />
											</IconButton>{" "}
											<IconButton
												aria-label="delete"
												size="large"
												color="error"
												onClick={() => {
													handleSourceSystemDeleteOpen(SourceSystem.name);
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

			{/* ----------------------------------------------------------------- ADD SourceSystem ----------------------------------------------------------------- */}
			<Dialog
				open={openSourceSystemAdd}
				onClose={handleSourceSystemAddClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Add SourceSystem</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new SourceSystem, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="SourceSystemname">SourceSystem Name</label>
							<input
								id="SourceSystemname"
								type="text"
								value={addSourceSystem.SourceSystemname}
								onChange={handleSourceSystemAddChange}
								className="form-control"
								placeholder="Enter SourceSystem Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="SourceSystemtype">SourceSystem type</label>
							<input
								id="SourceSystemtype"
								type="text"
								value={addSourceSystem.SourceSystemtype}
								onChange={handleSourceSystemAddChange}
								className="form-control"
								placeholder="Enter SourceSystem type"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="SourceSystemimg">SourceSystem Image</label>
							<input
								id="SourceSystemimg"
								type="text"
								value={addSourceSystem.SourceSystemimg}
								onChange={handleSourceSystemAddChange}
								className="form-control"
								placeholder="Enter SourceSystem Image"
							/>
						</div>
						{SourceSystemState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{SourceSystemState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSourceSystemAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddSourceSystem}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE SourceSystem ----------------------------------------------------------- */}
			<Dialog
				open={openSourceSystemUpdate}
				onClose={handleSourceSystemUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update SourceSystem</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the SourceSystem.</p>
					<form>
						<div className="form-group mt-2">
							<label for="SourceSystemid">SourceSystem ID</label>
							<input
								id="SourceSystemid"
								type="text"
								value={updateSourceSystem.SourceSystemid}
								onChange={handleSourceSystemUpdateChange}
								className="form-control"
								placeholder="Enter SourceSystem ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="SourceSystemname">SourceSystem Name</label>
							<input
								id="SourceSystemname"
								type="text"
								value={updateSourceSystem.SourceSystemname}
								onChange={handleSourceSystemUpdateChange}
								className="form-control"
								placeholder="Enter SourceSystem Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="SourceSystemtype">SourceSystem type</label>
							<input
								id="SourceSystemtype"
								type="text"
								value={updateSourceSystem.SourceSystemtype}
								onChange={handleSourceSystemUpdateChange}
								className="form-control"
								placeholder="Enter SourceSystem type"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="SourceSystemimg">SourceSystem Image</label>
							<input
								id="SourceSystemimg"
								type="text"
								value={updateSourceSystem.SourceSystemimg}
								onChange={handleSourceSystemUpdateChange}
								className="form-control"
								placeholder="Enter SourceSystem Image"
							/>
						</div>
						{SourceSystemState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{SourceSystemState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSourceSystemUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleSourceSystemUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE SourceSystem ----------------------------------------------------------- */}
			<Dialog
				open={openSourceSystemDelete}
				onClose={handleSourceSystemDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusSourceSystem}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="SourceSystemnametest"
						label="Enter the SourceSystem Name to confirm the action"
						variant="outlined"
						type="text"
						value={SourceSystemState.SourceSystemnametest}
						onChange={handleSourceSystemDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSourceSystemDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={
							SourceSystemState.SourceSystemnametest !== focusSourceSystem
						}
						onClick={() => {
							handleSourceSystemDelete(focusSourceSystem);
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

export default SourceSystemPanel;
