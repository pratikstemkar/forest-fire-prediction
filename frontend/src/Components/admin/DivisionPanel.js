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
import { API_URL, GDIV_URL, DIV_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DivisionPanel = (props) => {
	const { adddivision, updatedivision, deletedivision } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [divisionState, setDivisionState] = useState({
		searchdivision: "",
		divisionlist: [],
		error: "",
		divisionnametest: "",
		update: 1,
	});

	const [openDivisionAdd, setOpenDivisionAdd] = useState(false);
	const [openDivisionUpdate, setOpenDivisionUpdate] = useState(false);
	const [openDivisionDelete, setOpenDivisionDelete] = useState(false);
	const [focusDivision, setFocusDivision] = useState();

	const [addDivision, setAddDivision] = useState({
		divisionname: "",
		divisiondescription: "",
		divisionimg: "",
	});

	const [updateDivision, setUpdateDivision] = useState({
		divisionid: "",
		divisionname: "",
		divisiondescription: "",
		divisionimg: "",
	});

	// SEARCH DIVISION
	const handleSearchDivision = (e) => {
		const { id, value } = e.target;
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			[id]: value,
		}));
	};

	// ADD DIVISION
	const handleDivisionAddChange = (e) => {
		const { id, value } = e.target;
		setAddDivision((prevAddDivision) => ({
			...prevAddDivision,
			[id]: value,
		}));
	};

	const handleDivisionAddOpen = () => {
		setOpenDivisionAdd(true);
	};

	const handleDivisionAddClose = () => {
		setOpenDivisionAdd(false);
		setAddDivision((prevAddDivision) => ({
			divisionname: "",
			divisiondescription: "",
			divisionimg: "",
		}));
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			error: "",
		}));
	};

	const handleAddDivision = () => {
		if (addDivision.divisionname === "") {
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "Division Name field should not be empty.",
			}));
		} else if (addDivision.divisiondescription === "") {
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "Division Description field should not be empty.",
			}));
		} else if (addDivision.divisionimg === "") {
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "Division Image field should not be empty.",
			}));
		} else {
			adddivision(
				addDivision.divisionname,
				addDivision.divisiondescription,
				addDivision.divisionimg
			);
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "",
				update: prevDivisionState.update + 1,
			}));
			setOpenDivisionAdd(false);
			setAddDivision((prevAddDivision) => ({
				divisionname: "",
				divisiondescription: "",
				divisionimg: "",
			}));
		}
	};

	// UPDATE DIVISION
	const handleDivisionUpdateOpen = (divisionname) => {
		axios.get(`${API_URL}${DIV_URL}${divisionname}`).then(function (response) {
			if (response.status === 200) {
				setUpdateDivision({
					divisionid: response.data.id,
					divisionname: response.data.name,
					divisiondescription: response.data.description,
					divisionimg: response.data.img,
				});
				console.log(response.data);
			} else {
				console.log("error");
			}
		});
		setOpenDivisionUpdate(true);
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			update: prevDivisionState.update + 1,
		}));
		setFocusDivision(divisionname);
	};

	const handleDivisionUpdateClose = () => {
		setOpenDivisionUpdate(false);
		setFocusDivision();
		setUpdateDivision((prevUpdateDivision) => ({
			divisionid: "",
			divisionname: "",
			divisiondescription: "",
			divisionimg: "",
		}));
	};

	const handleDivisionUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateDivision((prevDivision) => ({
			...prevDivision,
			[id]: value,
		}));
	};

	const handleDivisionUpdate = () => {
		if (updateDivision.divisionid === "") {
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "Division ID field should not be empty.",
			}));
		} else if (updateDivision.divisionname === "") {
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "Division Name field should not be empty.",
			}));
		} else {
			updatedivision(
				updateDivision.divisionid,
				updateDivision.divisionname,
				updateDivision.divisiondescription,
				updateDivision.divisionimg
			);
			setFocusDivision();
			setOpenDivisionUpdate(false);
			setDivisionState((prevDivisionState) => ({
				...prevDivisionState,
				error: "",
				update: prevDivisionState.update + 1,
			}));
			setUpdateDivision((prevUpdateDivision) => ({
				divisionid: "",
				divisionname: "",
				divisiondescription: "",
				divisionimg: "",
			}));
		}
	};

	// DELETE DIVISION
	const handleDivisionDelete = (divisionname) => {
		deletedivision(divisionname);
		setOpenDivisionDelete(false);
		setFocusDivision();
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			divisionnametest: "",
			update: prevDivisionState.update + 1,
		}));
	};

	const handleDivisionDeleteOpen = (divisionname) => {
		setOpenDivisionDelete(true);
		setFocusDivision(divisionname);
	};

	const handleDivisionDeleteClose = () => {
		setOpenDivisionDelete(false);
		setFocusDivision();
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			divisionnametest: "",
		}));
	};

	const handleDivisionDeleteChange = (e) => {
		const { id, value } = e.target;
		setDivisionState((prevDivisionState) => ({
			...prevDivisionState,
			[id]: value,
		}));
	};

	// LOAD DIVISIONS AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GDIV_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setDivisionState((prevDivisionState) => ({
						...prevDivisionState,
						divisionlist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setDivisionState((prevDivisionState) => ({
						...prevDivisionState,
						divisionlist: [],
						error: "Divisions Not Loaded.",
					}));
				}
			});

		console.log(divisionState.divisionlist);
	}, [divisionState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openDivision}
				onClose={props.handleDivisionClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="primary">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleDivisionClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Divisions
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleDivisionClose}
						>
							Save
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleDivisionAddOpen}
					>
						Add Division
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchdivision"
							placeholder="Search Division"
							value={divisionState.searchdivision}
							onChange={handleSearchDivision}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{divisionState.divisionlist
							.filter((val) => {
								if (divisionState.searchdivision === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(divisionState.searchdivision.toLowerCase())
								) {
									return val;
								}
							})
							.map((division) => (
								<div className="col-md-3">
									<center>
										<Card className="mb-2" sx={{ maxWidth: 300 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={division.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{division.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{division.description}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleDivisionUpdateOpen(division.name);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleDivisionDeleteOpen(division.name);
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

			{/* ----------------------------------------------------------------- ADD DIVISION ----------------------------------------------------------------- */}
			<Dialog open={openDivisionAdd} onClose={handleDivisionAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Division</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new Division, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="divisionname">Division Name</label>
							<input
								id="divisionname"
								label="Division Name"
								type="text"
								value={addDivision.divisionname}
								onChange={handleDivisionAddChange}
								className="form-control"
								placeholder="Enter Division Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="divisiondescription">Division Description</label>
							<input
								id="divisiondescription"
								label="Division Description"
								type="text"
								value={addDivision.divisiondescription}
								onChange={handleDivisionAddChange}
								className="form-control"
								placeholder="Enter Division Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="divisionimg">Division Image</label>
							<input
								id="divisionimg"
								label="Division Image"
								type="text"
								value={addDivision.divisionimg}
								onChange={handleDivisionAddChange}
								className="form-control"
								placeholder="Enter Division Image"
							/>
						</div>
						{divisionState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{divisionState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDivisionAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddDivision}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Division
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE Division ----------------------------------------------------------- */}
			<Dialog
				open={openDivisionUpdate}
				onClose={handleDivisionUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update Division</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Division.</p>
					<form>
						<div className="form-group mt-2">
							<label for="divisionid">Division ID</label>
							<input
								id="divisionid"
								label="Division ID"
								type="text"
								value={updateDivision.divisionid}
								onChange={handleDivisionUpdateChange}
								className="form-control"
								placeholder="Enter Division ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="divisionname">Division Name</label>
							<input
								id="divisionname"
								label="Division Name"
								type="text"
								value={updateDivision.divisionname}
								onChange={handleDivisionUpdateChange}
								className="form-control"
								placeholder="Enter Division Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="divisiondescription">Division Description</label>
							<input
								id="divisiondescription"
								label="Division Description"
								type="text"
								value={updateDivision.divisiondescription}
								onChange={handleDivisionUpdateChange}
								className="form-control"
								placeholder="Enter Division Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="divisionimg">Division Image</label>
							<input
								id="divisionimg"
								label="Division Image"
								type="text"
								value={updateDivision.divisionimg}
								onChange={handleDivisionUpdateChange}
								className="form-control"
								placeholder="Enter Division Image"
							/>
						</div>
						{divisionState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{divisionState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDivisionUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleDivisionUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE Division ----------------------------------------------------------- */}
			<Dialog
				open={openDivisionDelete}
				onClose={handleDivisionDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusDivision}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="divisionnametest"
						label="Enter the division Name to confirm the action"
						variant="outlined"
						type="text"
						value={divisionState.divisionnametest}
						onChange={handleDivisionDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDivisionDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={divisionState.divisionnametest !== focusDivision}
						onClick={() => {
							handleDivisionDelete(focusDivision);
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

export default DivisionPanel;
