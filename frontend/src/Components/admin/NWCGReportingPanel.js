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

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_URL, GNWCG_URL, NWCG_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const NWCGReportingPanel = (props) => {
	const { addnwcgreporting, updatenwcgreporting, deletenwcgreporting } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [NWCGReportingState, setNWCGReportingState] = useState({
		searchNWCGReporting: "",
		NWCGReportinglist: [],
		error: "",
		NWCGReportingnametest: "",
		update: 1,
	});

	const [openNWCGReportingAdd, setOpenNWCGReportingAdd] = useState(false);
	const [openNWCGReportingUpdate, setOpenNWCGReportingUpdate] = useState(false);
	const [openNWCGReportingDelete, setOpenNWCGReportingDelete] = useState(false);
	const [focusNWCGReporting, setFocusNWCGReporting] = useState();

	const [addNWCGReporting, setAddNWCGReporting] = useState({
		NWCGReportingname: "",
		NWCGReportingagency: "",
		NWCGReportingimg: "",
	});

	const [updateNWCGReporting, setUpdateNWCGReporting] = useState({
		NWCGReportingid: "",
		NWCGReportingname: "",
		NWCGReportingagency: "",
		NWCGReportingimg: "",
	});

	// SEARCH NWCGReporting
	const handleSearchNWCGReporting = (e) => {
		const { id, value } = e.target;
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			[id]: value,
		}));
	};

	// ADD NWCGReporting
	const handleNWCGReportingAddChange = (e) => {
		const { id, value } = e.target;
		setAddNWCGReporting((prevAddNWCGReporting) => ({
			...prevAddNWCGReporting,
			[id]: value,
		}));
	};

	const handleNWCGReportingAddOpen = () => {
		setOpenNWCGReportingAdd(true);
	};

	const handleNWCGReportingAddClose = () => {
		setOpenNWCGReportingAdd(false);
		setAddNWCGReporting((prevAddNWCGReporting) => ({
			NWCGReportingname: "",
			NWCGReportingagency: "",
			NWCGReportingimg: "",
		}));
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			error: "",
		}));
	};

	const handleAddNWCGReporting = () => {
		if (addNWCGReporting.NWCGReportingname === "") {
			setNWCGReportingState((prevNWCGReportingState) => ({
				...prevNWCGReportingState,
				error: "NWCGReporting Name field should not be empty.",
			}));
		} else if (addNWCGReporting.NWCGReportingagency === "") {
			setNWCGReportingState((prevNWCGReportingState) => ({
				...prevNWCGReportingState,
				error: "NWCGReporting agency field should not be empty.",
			}));
		} else {
			addnwcgreporting(
				addNWCGReporting.NWCGReportingname,
				addNWCGReporting.NWCGReportingagency,
				addNWCGReporting.NWCGReportingimg
			);
			console.log(addNWCGReporting.NWCGReportingname);
			setNWCGReportingState((prevNWCGReportingState) => ({
				...prevNWCGReportingState,
				error: "",
				update: prevNWCGReportingState.update + 1,
			}));
			setOpenNWCGReportingAdd(false);
			setAddNWCGReporting((prevAddNWCGReporting) => ({
				NWCGReportingname: "",
				NWCGReportingagency: "",
				NWCGReportingimg: "",
			}));
		}
	};

	// UPDATE NWCGReporting
	const handleNWCGReportingUpdateOpen = (NWCGReportingname) => {
		axios
			.get(`${API_URL}${NWCG_URL}${NWCGReportingname}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateNWCGReporting({
						NWCGReportingid: response.data.id,
						NWCGReportingname: response.data.name,
						NWCGReportingagency: response.data.agency,
						NWCGReportingimg: response.data.img,
					});
					console.log(response.data);
				} else {
					console.log("error");
				}
			});
		setOpenNWCGReportingUpdate(true);
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			update: prevNWCGReportingState.update + 1,
		}));
		setFocusNWCGReporting(NWCGReportingname);
	};

	const handleNWCGReportingUpdateClose = () => {
		setOpenNWCGReportingUpdate(false);
		setFocusNWCGReporting();
	};

	const handleNWCGReportingUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateNWCGReporting((prevNWCGReporting) => ({
			...prevNWCGReporting,
			[id]: value,
		}));
	};

	const handleNWCGReportingUpdate = () => {
		if (updateNWCGReporting.NWCGReportingname === "") {
			setNWCGReportingState((prevNWCGReportingState) => ({
				...prevNWCGReportingState,
				error: "NWCGReporting Name field should not be empty.",
			}));
		} else {
			updatenwcgreporting(
				updateNWCGReporting.NWCGReportingid,
				updateNWCGReporting.NWCGReportingname,
				updateNWCGReporting.NWCGReportingagency,
				updateNWCGReporting.NWCGReportingimg
			);

			setFocusNWCGReporting();
			if (!props.loading) {
				setOpenNWCGReportingUpdate(false);
			}
			setNWCGReportingState((prevNWCGReportingState) => ({
				...prevNWCGReportingState,
				error: "",
				update: prevNWCGReportingState.update + 1,
			}));
		}
	};

	// DELETE NWCGReporting
	const handleNWCGReportingDelete = (NWCGReportingname) => {
		deletenwcgreporting(NWCGReportingname);
		setOpenNWCGReportingDelete(false);
		setFocusNWCGReporting();
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			NWCGReportingnametest: "",
			update: prevNWCGReportingState.update + 1,
		}));
	};

	const handleNWCGReportingDeleteOpen = (NWCGReportingname) => {
		setOpenNWCGReportingDelete(true);
		setFocusNWCGReporting(NWCGReportingname);
	};

	const handleNWCGReportingDeleteClose = () => {
		setOpenNWCGReportingDelete(false);
		setFocusNWCGReporting();
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			NWCGReportingnametest: "",
		}));
	};

	const handleNWCGReportingDeleteChange = (e) => {
		const { id, value } = e.target;
		setNWCGReportingState((prevNWCGReportingState) => ({
			...prevNWCGReportingState,
			[id]: value,
		}));
	};

	// LOAD NWCGReporting AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GNWCG_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setNWCGReportingState((prevNWCGReportingState) => ({
						...prevNWCGReportingState,
						NWCGReportinglist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setNWCGReportingState((prevNWCGReportingState) => ({
						...prevNWCGReportingState,
						NWCGReportinglist: [],
						error: "NWCGReporting Not Loaded.",
					}));
				}
			});

		console.log(NWCGReportingState.NWCGReportinglist);
	}, [NWCGReportingState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openNWCGReporting}
				onClose={props.handleNWCGReportingClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="success">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleNWCGReportingClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							NWCGReporting
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleNWCGReportingClose}
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
						onClick={handleNWCGReportingAddOpen}
					>
						Add NWCGReporting
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchNWCGReporting"
							placeholder="Search NWCGReporting"
							value={NWCGReportingState.searchNWCGReporting}
							onChange={handleSearchNWCGReporting}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{NWCGReportingState.NWCGReportinglist.filter((val) => {
							if (NWCGReportingState.searchNWCGReporting === "") {
								return val;
							} else if (
								val.name
									.toLowerCase()
									.includes(
										NWCGReportingState.searchNWCGReporting.toLowerCase()
									)
							) {
								return val;
							}
						}).map((NWCGReporting) => (
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
												image={NWCGReporting.img}
												alt="green iguana"
											/>
											<CardContent>
												<Typography sx={{ fontSize: 14 }} gutterBottom>
													{NWCGReporting.id}
												</Typography>
												<Typography variant="h5" component="div">
													{NWCGReporting.name}
												</Typography>
												<Typography variant="body2">
													{NWCGReporting.agency}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<IconButton
												aria-label="update"
												size="large"
												color="primary"
												onClick={() => {
													handleNWCGReportingUpdateOpen(NWCGReporting.name);
												}}
											>
												<CreateIcon fontSize="small" />
											</IconButton>{" "}
											<IconButton
												aria-label="delete"
												size="large"
												color="error"
												onClick={() => {
													handleNWCGReportingDeleteOpen(NWCGReporting.name);
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

			{/* ----------------------------------------------------------------- ADD NWCGReporting ----------------------------------------------------------------- */}
			<Dialog
				open={openNWCGReportingAdd}
				onClose={handleNWCGReportingAddClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Add NWCGReporting</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new NWCGReporting, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="NWCGReportingname">NWCGReporting Name</label>
							<input
								id="NWCGReportingname"
								type="text"
								value={addNWCGReporting.NWCGReportingname}
								onChange={handleNWCGReportingAddChange}
								className="form-control"
								placeholder="Enter NWCGReporting Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="NWCGReportingagency">NWCGReporting agency</label>
							<input
								id="NWCGReportingagency"
								type="text"
								value={addNWCGReporting.NWCGReportingagency}
								onChange={handleNWCGReportingAddChange}
								className="form-control"
								placeholder="Enter NWCGReporting agency"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="NWCGReportingimg">NWCGReporting Image</label>
							<input
								id="NWCGReportingimg"
								type="text"
								value={addNWCGReporting.NWCGReportingimg}
								onChange={handleNWCGReportingAddChange}
								className="form-control"
								placeholder="Enter NWCGReporting Image"
							/>
						</div>
						{NWCGReportingState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{NWCGReportingState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleNWCGReportingAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddNWCGReporting}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE NWCGReporting ----------------------------------------------------------- */}
			<Dialog
				open={openNWCGReportingUpdate}
				onClose={handleNWCGReportingUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update NWCGReporting</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the NWCGReporting.</p>
					<form>
						<div className="form-group mt-2">
							<label for="NWCGReportingid">NWCGReporting ID</label>
							<input
								id="NWCGReportingid"
								type="text"
								value={updateNWCGReporting.NWCGReportingid}
								onChange={handleNWCGReportingUpdateChange}
								className="form-control"
								placeholder="Enter NWCGReporting ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="NWCGReportingname">NWCGReporting Name</label>
							<input
								id="NWCGReportingname"
								type="text"
								value={updateNWCGReporting.NWCGReportingname}
								onChange={handleNWCGReportingUpdateChange}
								className="form-control"
								placeholder="Enter NWCGReporting Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="NWCGReportingagency">NWCGReporting agency</label>
							<input
								id="NWCGReportingagency"
								type="text"
								value={updateNWCGReporting.NWCGReportingagency}
								onChange={handleNWCGReportingUpdateChange}
								className="form-control"
								placeholder="Enter NWCGReporting agency"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="NWCGReportingimg">NWCGReporting Image</label>
							<input
								id="NWCGReportingimg"
								type="text"
								value={updateNWCGReporting.NWCGReportingimg}
								onChange={handleNWCGReportingUpdateChange}
								className="form-control"
								placeholder="Enter NWCGReporting Image"
							/>
						</div>
						{NWCGReportingState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{NWCGReportingState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleNWCGReportingUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleNWCGReportingUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE NWCGReporting ----------------------------------------------------------- */}
			<Dialog
				open={openNWCGReportingDelete}
				onClose={handleNWCGReportingDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusNWCGReporting}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="NWCGReportingnametest"
						label="Enter the NWCGReporting Name to confirm the action"
						variant="outlined"
						type="text"
						value={NWCGReportingState.NWCGReportingnametest}
						onChange={handleNWCGReportingDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleNWCGReportingDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={
							NWCGReportingState.NWCGReportingnametest !== focusNWCGReporting
						}
						onClick={() => {
							handleNWCGReportingDelete(focusNWCGReporting);
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

export default NWCGReportingPanel;
