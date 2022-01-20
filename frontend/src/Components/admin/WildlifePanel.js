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
import { API_URL, GWILD_URL, WILD_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const WildlifePanel = (props) => {
	const { addwildlife, updatewildlife, deletewildlife } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [wildlifeState, setWildlifeState] = useState({
		searchwildlife: "",
		wildlifelist: [],
		error: "",
		wildlifenametest: "",
		update: 1,
	});

	const [openWildlifeAdd, setOpenWildlifeAdd] = useState(false);
	const [openWildlifeUpdate, setOpenWildlifeUpdate] = useState(false);
	const [openWildlifeDelete, setOpenWildlifeDelete] = useState(false);
	const [focusWildlife, setFocusWildlife] = useState();

	const [addWildlife, setAddWildlife] = useState({
		wildlifename: "",
		wildlifealias: "",
		wildlifeimg: "",
	});

	const [updateWildlife, setUpdateWildlife] = useState({
		wildlifeid: "",
		wildlifename: "",
		wildlifealias: "",
		wildlifeimg: "",
	});

	// SEARCH WILDLIFE
	const handleSearchWildlife = (e) => {
		const { id, value } = e.target;
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			[id]: value,
		}));
	};

	// ADD WILDLIFE
	const handleWildlifeAddChange = (e) => {
		const { id, value } = e.target;
		setAddWildlife((prevAddWildlife) => ({
			...prevAddWildlife,
			[id]: value,
		}));
	};

	const handleWildlifeAddOpen = () => {
		setOpenWildlifeAdd(true);
	};

	const handleWildlifeAddClose = () => {
		setOpenWildlifeAdd(false);
		setAddWildlife((prevAddWildlife) => ({
			wildlifename: "",
			wildlifealias: "",
			wildlifeimg: "",
		}));
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			error: "",
		}));
	};

	const handleAddWildlife = () => {
		if (addWildlife.Wildlifename === "") {
			setWildlifeState((prevWildlifeState) => ({
				...prevWildlifeState,
				error: "Wildlife Name field should not be empty.",
			}));
		} else if (addWildlife.wildlifealias === "") {
			setWildlifeState((prevWildlifeState) => ({
				...prevWildlifeState,
				error: "Wildlife Alias field should not be empty.",
			}));
		} else {
			addwildlife(
				addWildlife.wildlifename,
				addWildlife.wildlifealias,
				addWildlife.wildlifeimg
			);
			console.log(addWildlife.wildlifename);
			setWildlifeState((prevWildlifeState) => ({
				...prevWildlifeState,
				error: "",
				update: prevWildlifeState.update + 1,
			}));
			setOpenWildlifeAdd(false);
			setAddWildlife((prevAddWildlife) => ({
				wildlifename: "",
				wildlifealias: "",
				wildlifeimg: "",
			}));
		}
	};

	// UPDATE WILDLIFE
	const handleWildlifeUpdateOpen = (wildlifename) => {
		axios.get(`${API_URL}${WILD_URL}${wildlifename}`).then(function (response) {
			if (response.status === 200) {
				setUpdateWildlife({
					wildlifeid: response.data.id,
					wildlifename: response.data.name,
					wildlifealias: response.data.alias,
					wildlifeimg: response.data.img,
				});
				console.log(response.data);
			} else {
				console.log("error");
			}
		});
		setOpenWildlifeUpdate(true);
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			update: prevWildlifeState.update + 1,
		}));
		setFocusWildlife(wildlifename);
	};

	const handleWildlifeUpdateClose = () => {
		setOpenWildlifeUpdate(false);
		setFocusWildlife();
	};

	const handleWildlifeUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateWildlife((prevWildlife) => ({
			...prevWildlife,
			[id]: value,
		}));
	};

	const handleWildlifeUpdate = () => {
		if (updateWildlife.wildlifename === "") {
			setWildlifeState((prevWildlifeState) => ({
				...prevWildlifeState,
				error: "Wildlife Name field should not be empty.",
			}));
		} else {
			updatewildlife(
				updateWildlife.wildlifeid,
				updateWildlife.wildlifename,
				updateWildlife.wildlifealias,
				updateWildlife.wildlifeimg
			);

			setFocusWildlife();
			if (!props.loading) {
				setOpenWildlifeUpdate(false);
			}
			setWildlifeState((prevWildlifeState) => ({
				...prevWildlifeState,
				error: "",
				update: prevWildlifeState.update + 1,
			}));
		}
	};

	// DELETE WILDLIFE
	const handleWildlifeDelete = (wildlifename) => {
		deletewildlife(wildlifename);
		setOpenWildlifeDelete(false);
		setFocusWildlife();
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			wildlifenametest: "",
			update: prevWildlifeState.update + 1,
		}));
	};

	const handleWildlifeDeleteOpen = (wildlifename) => {
		setOpenWildlifeDelete(true);
		setFocusWildlife(wildlifename);
	};

	const handleWildlifeDeleteClose = () => {
		setOpenWildlifeDelete(false);
		setFocusWildlife();
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			wildlifenametest: "",
		}));
	};

	const handleWildlifeDeleteChange = (e) => {
		const { id, value } = e.target;
		setWildlifeState((prevWildlifeState) => ({
			...prevWildlifeState,
			[id]: value,
		}));
	};

	// LOAD WILDLIFE AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GWILD_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setWildlifeState((prevWildlifeState) => ({
						...prevWildlifeState,
						wildlifelist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setWildlifeState((prevWildlifeState) => ({
						...prevWildlifeState,
						wildlifelist: [],
						error: "Wildlife Not Loaded.",
					}));
				}
			});

		console.log(wildlifeState.wildlifelist);
	}, [wildlifeState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openWildlife}
				onClose={props.handleWildlifeClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="success">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleWildlifeClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Wildlife
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleWildlifeClose}
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
						onClick={handleWildlifeAddOpen}
					>
						Add Wildlife
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchwildlife"
							placeholder="Search Wildlife"
							value={wildlifeState.searchwildlife}
							onChange={handleSearchWildlife}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{wildlifeState.wildlifelist
							.filter((val) => {
								if (wildlifeState.searchwildlife === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(wildlifeState.searchwildlife.toLowerCase())
								) {
									return val;
								}
							})
							.map((wildlife) => (
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
													image={wildlife.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography sx={{ fontSize: 14 }} gutterBottom>
														{wildlife.id}
													</Typography>
													<Typography variant="h5" component="div">
														{wildlife.name}
													</Typography>
													<Typography variant="body2">
														{wildlife.alias}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleWildlifeUpdateOpen(wildlife.name);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleWildlifeDeleteOpen(wildlife.name);
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

			{/* ----------------------------------------------------------------- ADD WILDLIFE ----------------------------------------------------------------- */}
			<Dialog open={openWildlifeAdd} onClose={handleWildlifeAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Wildlife</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new Wildlife, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="wildlifename">Wildlife Name</label>
							<input
								id="wildlifename"
								type="text"
								value={addWildlife.wildlifename}
								onChange={handleWildlifeAddChange}
								className="form-control"
								placeholder="Enter Wildlife Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="wildlifealias">Wildlife Alias</label>
							<input
								id="wildlifealias"
								type="text"
								value={addWildlife.wildlifealias}
								onChange={handleWildlifeAddChange}
								className="form-control"
								placeholder="Enter Wildlife Alias"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="wildlifeimg">Wildlife Image</label>
							<input
								id="wildlifeimg"
								type="text"
								value={addWildlife.wildlifeimg}
								onChange={handleWildlifeAddChange}
								className="form-control"
								placeholder="Enter Wildlife Image"
							/>
						</div>
						{wildlifeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{wildlifeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleWildlifeAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddWildlife}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE WILDLIFE ----------------------------------------------------------- */}
			<Dialog
				open={openWildlifeUpdate}
				onClose={handleWildlifeUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update Wildlife</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Wildlife.</p>
					<form>
						<div className="form-group mt-2">
							<label for="wildlifeid">Wildlife ID</label>
							<input
								id="wildlifeid"
								type="text"
								value={updateWildlife.wildlifeid}
								onChange={handleWildlifeUpdateChange}
								className="form-control"
								placeholder="Enter Wildlife ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="wildlifename">Wildlife Name</label>
							<input
								id="wildlifename"
								type="text"
								value={updateWildlife.wildlifename}
								onChange={handleWildlifeUpdateChange}
								className="form-control"
								placeholder="Enter Wildlife Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="wildlifealias">Wildlife Alias</label>
							<input
								id="wildlifealias"
								type="text"
								value={updateWildlife.wildlifealias}
								onChange={handleWildlifeUpdateChange}
								className="form-control"
								placeholder="Enter Wildlife Alias"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="wildlifeimg">Wildlife Image</label>
							<input
								id="wildlifeimg"
								type="text"
								value={updateWildlife.wildlifeimg}
								onChange={handleWildlifeUpdateChange}
								className="form-control"
								placeholder="Enter Wildlife Image"
							/>
						</div>
						{wildlifeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{wildlifeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleWildlifeUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleWildlifeUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE WILDLIFE ----------------------------------------------------------- */}
			<Dialog
				open={openWildlifeDelete}
				onClose={handleWildlifeDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusWildlife}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="wildlifenametest"
						label="Enter the Wildlife Name to confirm the action"
						variant="outlined"
						type="text"
						value={wildlifeState.wildlifenametest}
						onChange={handleWildlifeDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleWildlifeDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={wildlifeState.wildlifenametest !== focusWildlife}
						onClick={() => {
							handleWildlifeDelete(focusWildlife);
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

export default WildlifePanel;
