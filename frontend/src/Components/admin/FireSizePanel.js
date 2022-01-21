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
import { API_URL, FSIZE_URL, GFSIZE_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FireSizePanel = (props) => {
	const { addfiresize, updatefiresize, deletefiresize } =
		useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [firesizeState, setFireSizeState] = useState({
		searchfiresize: "",
		firesizelist: [],
		error: "",
		firesizegradetest: "",
		update: 1,
	});

	const [openFireSizeAdd, setOpenFireSizeAdd] = useState(false);
	const [openFireSizeUpdate, setOpenFireSizeUpdate] = useState(false);
	const [openFireSizeDelete, setOpenFireSizeDelete] = useState(false);
	const [focusFireSize, setFocusFireSize] = useState();

	const [addFireSize, setAddFireSize] = useState({
		firesizegrade: "",
		firesizesize: "",
		firesizeimg: "",
	});

	const [updateFireSize, setUpdateFireSize] = useState({
		firesizeid: "",
		firesizegrade: "",
		firesizesize: "",
		firesizeimg: "",
	});

	// SEARCH FIRE SIZE
	const handleSearchFireSize = (e) => {
		const { id, value } = e.target;
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			[id]: value,
		}));
	};

	// ADD FIRE SIZE
	const handleFireSizeAddChange = (e) => {
		const { id, value } = e.target;
		setAddFireSize((prevAddFireSize) => ({
			...prevAddFireSize,
			[id]: value,
		}));
	};

	const handleFireSizeAddOpen = () => {
		setOpenFireSizeAdd(true);
	};

	const handleFireSizeAddClose = () => {
		setOpenFireSizeAdd(false);
		setAddFireSize((prevAddFireSize) => ({
			...prevAddFireSize,
			firesizegrade: "",
			firesizesize: "",
			firesizeimg: "",
		}));
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			error: "",
		}));
	};

	const handleAddFireSize = () => {
		if (addFireSize.firesizegrade === "") {
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "FireSize Grade field should not be empty.",
			}));
		} else if (addFireSize.firesizesize === "") {
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "FireSize Size field should not be empty.",
			}));
		} else if (addFireSize.firesizeimg === "") {
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "FireSize Image field should not be empty.",
			}));
		} else {
			addfiresize(
				addFireSize.firesizegrade,
				addFireSize.firesizesize,
				addFireSize.firesizeimg
			);
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "",
				update: prevFireSizeState.update + 1,
			}));
			setOpenFireSizeAdd(false);
			setAddFireSize((prevAddFireSize) => ({
				firesizegrade: "",
				firesizesize: "",
				firesizeimg: "",
			}));
		}
	};

	// UPDATE FIRE SIZE
	const handleFireSizeUpdateOpen = (firesizegrade) => {
		axios
			.get(`${API_URL}${FSIZE_URL}${firesizegrade}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateFireSize({
						firesizeid: response.data.id,
						firesizegrade: response.data.grade,
						firesizesize: response.data.size,
						firesizeimg: response.data.img,
					});
					console.log(response.data);
				} else {
					console.log("error");
				}
			});
		setOpenFireSizeUpdate(true);
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			update: prevFireSizeState.update + 1,
		}));
		setFocusFireSize(firesizegrade);
	};

	const handleFireSizeUpdateClose = () => {
		setOpenFireSizeUpdate(false);
		setFocusFireSize();
		setUpdateFireSize((prevUpdateFireSize) => ({
			firesizeid: "",
			firesizegrade: "",
			firesizesize: "",
			firesizeimg: "",
		}));
	};

	const handleFireSizeUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateFireSize((prevFireSize) => ({
			...prevFireSize,
			[id]: value,
		}));
	};

	const handleFireSizeUpdate = () => {
		if (updateFireSize.firesizeid === "") {
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "FireSize ID field should not be empty.",
			}));
		} else if (updateFireSize.firesizegrade === "") {
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "FireSize grade field should not be empty.",
			}));
		} else {
			updatefiresize(
				updateFireSize.firesizeid,
				updateFireSize.firesizegrade,
				updateFireSize.firesizesize,
				updateFireSize.firesizeimg
			);
			setFocusFireSize();
			setOpenFireSizeUpdate(false);
			setFireSizeState((prevFireSizeState) => ({
				...prevFireSizeState,
				error: "",
				update: prevFireSizeState.update + 1,
			}));
			setUpdateFireSize((prevUpdateFireSize) => ({
				firesizeid: "",
				firesizegrade: "",
				firesizesize: "",
				firesizeimg: "",
			}));
		}
	};

	// DELETE FIRE SIZE
	const handleFireSizeDelete = (firesizegrade) => {
		deletefiresize(firesizegrade);
		setOpenFireSizeDelete(false);
		setFocusFireSize();
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			firesizegradetest: "",
			update: prevFireSizeState.update + 1,
		}));
	};

	const handleFireSizeDeleteOpen = (FireSizegrade) => {
		setOpenFireSizeDelete(true);
		setFocusFireSize(FireSizegrade);
	};

	const handleFireSizeDeleteClose = () => {
		setOpenFireSizeDelete(false);
		setFocusFireSize();
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			firesizegradetest: "",
		}));
	};

	const handleFireSizeDeleteChange = (e) => {
		const { id, value } = e.target;
		setFireSizeState((prevFireSizeState) => ({
			...prevFireSizeState,
			[id]: value,
		}));
	};

	// LOAD FireSizeS AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GFSIZE_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setFireSizeState((prevFireSizeState) => ({
						...prevFireSizeState,
						firesizelist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setFireSizeState((prevFireSizeState) => ({
						...prevFireSizeState,
						firesizelist: [],
						error: "Fire Sizes Not Loaded.",
					}));
				}
			});

		console.log(firesizeState.firesizelist);
	}, [firesizeState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openFireSize}
				onClose={props.handleFireSizeClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="primary">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleFireSizeClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Fire Size
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleFireSizeClose}
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
						onClick={handleFireSizeAddOpen}
					>
						Add Fire Size
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchfiresize"
							placeholder="Search Fire Size"
							value={firesizeState.searchfiresize}
							onChange={handleSearchFireSize}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{firesizeState.firesizelist
							.filter((val) => {
								if (firesizeState.searchfiresize === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(firesizeState.searchfiresize.toLowerCase())
								) {
									return val;
								}
							})
							.map((firesize) => (
								<div className="col-md-3">
									<center>
										<Card className="mb-2" sx={{ maxWidth: 300 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={firesize.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{firesize.grade}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{firesize.size}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleFireSizeUpdateOpen(firesize.grade);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleFireSizeDeleteOpen(firesize.grade);
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

			{/* ----------------------------------------------------------------- ADD FIRE SIZE ----------------------------------------------------------------- */}
			<Dialog open={openFireSizeAdd} onClose={handleFireSizeAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add FireSize</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new FireSize, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="firesizegrade">Fire Size Grade</label>
							<input
								id="firesizegrade"
								label="Fire Size Grade"
								type="text"
								value={addFireSize.firesizegrade}
								onChange={handleFireSizeAddChange}
								className="form-control"
								placeholder="Enter Fire Size Grade"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="firesizesize">FireSize Size</label>
							<input
								id="firesizesize"
								label="FireSize Size"
								type="text"
								value={addFireSize.firesizesize}
								onChange={handleFireSizeAddChange}
								className="form-control"
								placeholder="Enter FireSize Size"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="firesizeimg">FireSize Image</label>
							<input
								id="firesizeimg"
								label="FireSize Image"
								type="text"
								value={addFireSize.firesizeimg}
								onChange={handleFireSizeAddChange}
								className="form-control"
								placeholder="Enter FireSize Image"
							/>
						</div>
						{firesizeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{firesizeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireSizeAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddFireSize}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save FireSize
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE FireSize ----------------------------------------------------------- */}
			<Dialog
				open={openFireSizeUpdate}
				onClose={handleFireSizeUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update FireSize</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the FireSize.</p>
					<form>
						<div className="form-group mt-2">
							<label for="firesizeid">FireSize ID</label>
							<input
								id="firesizeid"
								label="FireSize ID"
								type="text"
								value={updateFireSize.firesizeid}
								onChange={handleFireSizeUpdateChange}
								className="form-control"
								placeholder="Enter FireSize ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="firesizegrade">FireSize Grade</label>
							<input
								id="firesizegrade"
								label="FireSize Grade"
								type="text"
								value={updateFireSize.firesizegrade}
								onChange={handleFireSizeUpdateChange}
								className="form-control"
								placeholder="Enter FireSize Grade"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="firesizesize">FireSize Size</label>
							<input
								id="firesizesize"
								label="FireSize Size"
								type="text"
								value={updateFireSize.firesizesize}
								onChange={handleFireSizeUpdateChange}
								className="form-control"
								placeholder="Enter FireSize Size"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="firesizeimg">FireSize Image</label>
							<input
								id="firesizeimg"
								label="FireSize Image"
								type="text"
								value={updateFireSize.firesizeimg}
								onChange={handleFireSizeUpdateChange}
								className="form-control"
								placeholder="Enter FireSize Image"
							/>
						</div>
						{firesizeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{firesizeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireSizeUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleFireSizeUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE FireSize ----------------------------------------------------------- */}
			<Dialog
				open={openFireSizeDelete}
				onClose={handleFireSizeDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusFireSize}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Proceed cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="firesizegradetest"
						label="Enter the FireSize Grade to confirm the action"
						variant="outlined"
						type="text"
						value={firesizeState.firesizegradetest}
						onChange={handleFireSizeDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleFireSizeDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={firesizeState.firesizenametest !== focusFireSize}
						onClick={() => {
							handleFireSizeDelete(focusFireSize);
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

export default FireSizePanel;
