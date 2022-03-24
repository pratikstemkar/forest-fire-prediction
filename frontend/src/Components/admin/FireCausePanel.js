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
import { GFCAUSE_URL, FCAUSE_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FireCausePanel = (props) => {
	const { addfirecause, updatefirecause, deletefirecause } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [FireCauseState, setFireCauseState] = useState({
		searchFireCause: "",
		FireCauselist: [],
		error: "",
		FireCausenametest: "",
		update: 1,
	});

	const [openFireCauseAdd, setOpenFireCauseAdd] = useState(false);
	const [openFireCauseUpdate, setOpenFireCauseUpdate] = useState(false);
	const [openFireCauseDelete, setOpenFireCauseDelete] = useState(false);
	const [focusFireCause, setFocusFireCause] = useState();

	const [addFireCause, setAddFireCause] = useState({
		FireCausename: "",
		FireCauseimg: "",
	});

	const [updateFireCause, setUpdateFireCause] = useState({
		FireCauseid: "",
		FireCausename: "",
		FireCauseimg: "",
	});

	// SEARCH FireCause
	const handleSearchFireCause = (e) => {
		const { id, value } = e.target;
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			[id]: value,
		}));
	};

	// ADD FireCause
	const handleFireCauseAddChange = (e) => {
		const { id, value } = e.target;
		setAddFireCause((prevAddFireCause) => ({
			...prevAddFireCause,
			[id]: value,
		}));
	};

	const handleFireCauseAddOpen = () => {
		setOpenFireCauseAdd(true);
	};

	const handleFireCauseAddClose = () => {
		setOpenFireCauseAdd(false);
		setAddFireCause((prevAddFireCause) => ({
			FireCausename: "",
			FireCauseimg: "",
		}));
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			error: "",
		}));
	};

	const handleAddFireCause = () => {
		if (addFireCause.FireCausename === "") {
			setFireCauseState((prevFireCauseState) => ({
				...prevFireCauseState,
				error: "FireCause Name field should not be empty.",
			}));
		} else {
			addfirecause(addFireCause.FireCausename, addFireCause.FireCauseimg);
			console.log(addFireCause.FireCausename);
			setFireCauseState((prevFireCauseState) => ({
				...prevFireCauseState,
				error: "",
				update: prevFireCauseState.update + 1,
			}));
			setOpenFireCauseAdd(false);
			setAddFireCause((prevAddUser) => ({
				FireCausename: "",
				FireCauseimg: "",
			}));
		}
	};

	// UPDATE FireCause
	const handleFireCauseUpdateOpen = (FireCausename) => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${FCAUSE_URL}${FireCausename}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateFireCause({
						FireCauseid: response.data.id,
						FireCausename: response.data.name,
						FireCauseimg: response.data.img,
					});
					console.log(response.data);
				} else {
					console.log("error");
				}
			});
		setOpenFireCauseUpdate(true);
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			update: prevFireCauseState.update + 1,
		}));
		setFocusFireCause(FireCausename);
	};

	const handleFireCauseUpdateClose = () => {
		setOpenFireCauseUpdate(false);
		setFocusFireCause();
	};

	const handleFireCauseUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateFireCause((prevFireCause) => ({
			...prevFireCause,
			[id]: value,
		}));
	};

	const handleFireCauseUpdate = () => {
		if (updateFireCause.FireCausename === "") {
			setFireCauseState((prevFireCauseState) => ({
				...prevFireCauseState,
				error: "FireCause Name field should not be empty.",
			}));
		} else {
			updatefirecause(
				updateFireCause.FireCauseid,
				updateFireCause.FireCausename,
				updateFireCause.FireCauseimg
			);

			setFocusFireCause();
			if (!props.loading) {
				setOpenFireCauseUpdate(false);
			}
			setFireCauseState((prevFireCauseState) => ({
				...prevFireCauseState,
				error: "",
				update: prevFireCauseState.update + 1,
			}));
		}
	};

	// DELETE FireCause
	const handleFireCauseDelete = (FireCausename) => {
		deletefirecause(FireCausename);
		setOpenFireCauseDelete(false);
		setFocusFireCause();
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			FireCausenametest: "",
			update: prevFireCauseState.update + 1,
		}));
	};

	const handleFireCauseDeleteOpen = (FireCausename) => {
		setOpenFireCauseDelete(true);
		setFocusFireCause(FireCausename);
	};

	const handleFireCauseDeleteClose = () => {
		setOpenFireCauseDelete(false);
		setFocusFireCause();
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			FireCausenametest: "",
		}));
	};

	const handleFireCauseDeleteChange = (e) => {
		const { id, value } = e.target;
		setFireCauseState((prevFireCauseState) => ({
			...prevFireCauseState,
			[id]: value,
		}));
	};

	// LOAD FireCauseS AT RELOAD
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${GFCAUSE_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setFireCauseState((prevFireCauseState) => ({
						...prevFireCauseState,
						FireCauselist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setFireCauseState((prevFireCauseState) => ({
						...prevFireCauseState,
						FireCauselist: [],
						error: "FireCauses Not Loaded.",
					}));
				}
			});

		console.log(FireCauseState.FireCauselist);
	}, [FireCauseState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openFireCause}
				onClose={props.handleFireCauseClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="secondary">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleFireCauseClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Fire Cause
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleFireCauseClose}
						>
							SAVE
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleFireCauseAddOpen}
					>
						Add FireCause
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchFireCause"
							placeholder="Search FireCause"
							value={FireCauseState.searchFireCause}
							onChange={handleSearchFireCause}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{FireCauseState.FireCauselist.filter((val) => {
							if (FireCauseState.searchFireCause === "") {
								return val;
							} else if (
								val.name
									.toLowerCase()
									.includes(FireCauseState.searchFireCause.toLowerCase())
							) {
								return val;
							}
						}).map((FireCause) => (
							<div className="col-md-3">
								<center>
									<Card className="mb-2" sx={{ maxWidth: 300 }}>
										<CardActionArea>
											<CardMedia
												component="img"
												height="140"
												image={FireCause.img}
												alt="green iguana"
											/>
											<CardContent>
												<Typography sx={{ fontSize: 14 }} gutterBottom>
													{FireCause.id}
												</Typography>
												<Typography gutterBottom variant="h5" component="div">
													{FireCause.name}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<IconButton
												aria-label="update"
												size="large"
												color="primary"
												onClick={() => {
													handleFireCauseUpdateOpen(FireCause.name);
												}}
											>
												<CreateIcon fontSize="small" />
											</IconButton>{" "}
											<IconButton
												aria-label="delete"
												size="large"
												color="error"
												onClick={() => {
													handleFireCauseDeleteOpen(FireCause.name);
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

			{/* ----------------------------------------------------------------- ADD FireCause ----------------------------------------------------------------- */}
			<Dialog
				open={openFireCauseAdd}
				onClose={handleFireCauseAddClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Add FireCause</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new FireCause, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="FireCausename">FireCause Name</label>
							<input
								id="FireCausename"
								type="text"
								value={addFireCause.FireCausename}
								onChange={handleFireCauseAddChange}
								className="form-control"
								placeholder="Enter FireCause Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="FireCauseimg">FireCause Image</label>
							<input
								id="FireCauseimg"
								type="text"
								value={addFireCause.FireCauseimg}
								onChange={handleFireCauseAddChange}
								className="form-control"
								placeholder="Enter FireCause Image"
							/>
						</div>
						{FireCauseState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{FireCauseState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireCauseAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddFireCause}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE FireCause ----------------------------------------------------------- */}
			<Dialog
				open={openFireCauseUpdate}
				onClose={handleFireCauseUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update FireCause</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the FireCause.</p>
					<form>
						<div className="form-group mt-2">
							<label for="FireCauseid">FireCause ID</label>
							<input
								id="FireCauseid"
								type="text"
								value={updateFireCause.FireCauseid}
								onChange={handleFireCauseUpdateChange}
								className="form-control"
								placeholder="Enter FireCause ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="FireCausename">FireCause Name</label>
							<input
								id="FireCausename"
								type="text"
								value={updateFireCause.FireCausename}
								onChange={handleFireCauseUpdateChange}
								className="form-control"
								placeholder="Enter FireCause Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="FireCauseimg">FireCause Image</label>
							<input
								id="FireCauseimg"
								type="text"
								value={updateFireCause.FireCauseimg}
								onChange={handleFireCauseUpdateChange}
								className="form-control"
								placeholder="Enter FireCause Image"
							/>
						</div>
						{FireCauseState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{FireCauseState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireCauseUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleFireCauseUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE FireCause ----------------------------------------------------------- */}
			<Dialog
				open={openFireCauseDelete}
				onClose={handleFireCauseDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusFireCause}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="FireCausenametest"
						label="Enter the FireCause Name to confirm the action"
						variant="outlined"
						type="text"
						value={FireCauseState.FireCausenametest}
						onChange={handleFireCauseDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireCauseDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={FireCauseState.FireCausenametest !== focusFireCause}
						onClick={() => {
							handleFireCauseDelete(focusFireCause);
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

export default FireCausePanel;
