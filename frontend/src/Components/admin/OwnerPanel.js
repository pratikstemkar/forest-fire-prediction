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
import { GOWNER_URL, OWNER_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const OwnerPanel = (props) => {
	const { addowner, updateowner, deleteowner } = useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [OwnerState, setOwnerState] = useState({
		searchOwner: "",
		Ownerlist: [],
		error: "",
		Ownernametest: "",
		update: 1,
	});

	const [openOwnerAdd, setOpenOwnerAdd] = useState(false);
	const [openOwnerUpdate, setOpenOwnerUpdate] = useState(false);
	const [openOwnerDelete, setOpenOwnerDelete] = useState(false);
	const [focusOwner, setFocusOwner] = useState();

	const [addOwner, setAddOwner] = useState({
		Ownername: "",
		Ownerimg: "",
	});

	const [updateOwner, setUpdateOwner] = useState({
		Ownerid: "",
		Ownername: "",
		Ownerimg: "",
	});

	// SEARCH Owner
	const handleSearchOwner = (e) => {
		const { id, value } = e.target;
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			[id]: value,
		}));
	};

	// ADD Owner
	const handleOwnerAddChange = (e) => {
		const { id, value } = e.target;
		setAddOwner((prevAddOwner) => ({
			...prevAddOwner,
			[id]: value,
		}));
	};

	const handleOwnerAddOpen = () => {
		setOpenOwnerAdd(true);
	};

	const handleOwnerAddClose = () => {
		setOpenOwnerAdd(false);
		setAddOwner((prevAddOwner) => ({
			Ownername: "",
			Ownerimg: "",
		}));
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			error: "",
		}));
	};

	const handleAddOwner = () => {
		if (addOwner.Ownername === "") {
			setOwnerState((prevOwnerState) => ({
				...prevOwnerState,
				error: "Owner Name field should not be empty.",
			}));
		} else {
			addowner(addOwner.Ownername, addOwner.Ownerimg);
			console.log(addOwner.Ownername);
			setOwnerState((prevOwnerState) => ({
				...prevOwnerState,
				error: "",
				update: prevOwnerState.update + 1,
			}));
			setOpenOwnerAdd(false);
			setAddOwner((prevAddUser) => ({
				Ownername: "",
				Ownerimg: "",
			}));
		}
	};

	// UPDATE Owner
	const handleOwnerUpdateOpen = (Ownername) => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${OWNER_URL}${Ownername}`)
			.then(function (response) {
				if (response.status === 200) {
					setUpdateOwner({
						Ownerid: response.data.id,
						Ownername: response.data.name,
						Ownerimg: response.data.img,
					});
					console.log(response.data);
				} else {
					console.log("error");
				}
			});
		setOpenOwnerUpdate(true);
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			update: prevOwnerState.update + 1,
		}));
		setFocusOwner(Ownername);
	};

	const handleOwnerUpdateClose = () => {
		setOpenOwnerUpdate(false);
		setFocusOwner();
	};

	const handleOwnerUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateOwner((prevOwner) => ({
			...prevOwner,
			[id]: value,
		}));
	};

	const handleOwnerUpdate = () => {
		if (updateOwner.Ownername === "") {
			setOwnerState((prevOwnerState) => ({
				...prevOwnerState,
				error: "Owner Name field should not be empty.",
			}));
		} else {
			updateowner(
				updateOwner.Ownerid,
				updateOwner.Ownername,
				updateOwner.Ownerimg
			);

			setFocusOwner();
			if (!props.loading) {
				setOpenOwnerUpdate(false);
			}
			setOwnerState((prevOwnerState) => ({
				...prevOwnerState,
				error: "",
				update: prevOwnerState.update + 1,
			}));
		}
	};

	// DELETE Owner
	const handleOwnerDelete = (Ownername) => {
		deleteowner(Ownername);
		setOpenOwnerDelete(false);
		setFocusOwner();
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			Ownernametest: "",
			update: prevOwnerState.update + 1,
		}));
	};

	const handleOwnerDeleteOpen = (Ownername) => {
		setOpenOwnerDelete(true);
		setFocusOwner(Ownername);
	};

	const handleOwnerDeleteClose = () => {
		setOpenOwnerDelete(false);
		setFocusOwner();
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			Ownernametest: "",
		}));
	};

	const handleOwnerDeleteChange = (e) => {
		const { id, value } = e.target;
		setOwnerState((prevOwnerState) => ({
			...prevOwnerState,
			[id]: value,
		}));
	};

	// LOAD OwnerS AT RELOAD
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}${GOWNER_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setOwnerState((prevOwnerState) => ({
						...prevOwnerState,
						Ownerlist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setOwnerState((prevOwnerState) => ({
						...prevOwnerState,
						Ownerlist: [],
						error: "Owners Not Loaded.",
					}));
				}
			});

		console.log(OwnerState.Ownerlist);
	}, [OwnerState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openOwner}
				onClose={props.handleOwnerClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="secondary">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleOwnerClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Owner
						</Typography>
						<Button autoFocus color="inherit" onClick={props.handleOwnerClose}>
							SAVE
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleOwnerAddOpen}
					>
						Add Owner
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchOwner"
							placeholder="Search Owner"
							value={OwnerState.searchOwner}
							onChange={handleSearchOwner}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{OwnerState.Ownerlist.filter((val) => {
							if (OwnerState.searchOwner === "") {
								return val;
							} else if (
								val.name
									.toLowerCase()
									.includes(OwnerState.searchOwner.toLowerCase())
							) {
								return val;
							}
						}).map((Owner) => (
							<div className="col-md-3">
								<center>
									<Card className="mb-2" sx={{ maxWidth: 300 }}>
										<CardActionArea>
											<CardMedia
												component="img"
												height="140"
												image={Owner.img}
												alt="green iguana"
											/>
											<CardContent>
												<Typography sx={{ fontSize: 14 }} gutterBottom>
													{Owner.id}
												</Typography>
												<Typography gutterBottom variant="h5" component="div">
													{Owner.name}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<IconButton
												aria-label="update"
												size="large"
												color="primary"
												onClick={() => {
													handleOwnerUpdateOpen(Owner.name);
												}}
											>
												<CreateIcon fontSize="small" />
											</IconButton>{" "}
											<IconButton
												aria-label="delete"
												size="large"
												color="error"
												onClick={() => {
													handleOwnerDeleteOpen(Owner.name);
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

			{/* ----------------------------------------------------------------- ADD Owner ----------------------------------------------------------------- */}
			<Dialog open={openOwnerAdd} onClose={handleOwnerAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Owner</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new Owner, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="Ownername">Owner Name</label>
							<input
								id="Ownername"
								type="text"
								value={addOwner.Ownername}
								onChange={handleOwnerAddChange}
								className="form-control"
								placeholder="Enter Owner Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="Ownerimg">Owner Image</label>
							<input
								id="Ownerimg"
								type="text"
								value={addOwner.Ownerimg}
								onChange={handleOwnerAddChange}
								className="form-control"
								placeholder="Enter Owner Image"
							/>
						</div>
						{OwnerState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{OwnerState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleOwnerAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddOwner}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE Owner ----------------------------------------------------------- */}
			<Dialog open={openOwnerUpdate} onClose={handleOwnerUpdateClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Update Owner</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Owner.</p>
					<form>
						<div className="form-group mt-2">
							<label for="Ownerid">Owner ID</label>
							<input
								id="Ownerid"
								type="text"
								value={updateOwner.Ownerid}
								onChange={handleOwnerUpdateChange}
								className="form-control"
								placeholder="Enter Owner ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="Ownername">Owner Name</label>
							<input
								id="Ownername"
								type="text"
								value={updateOwner.Ownername}
								onChange={handleOwnerUpdateChange}
								className="form-control"
								placeholder="Enter Owner Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="Ownerimg">Owner Image</label>
							<input
								id="Ownerimg"
								type="text"
								value={updateOwner.Ownerimg}
								onChange={handleOwnerUpdateChange}
								className="form-control"
								placeholder="Enter Owner Image"
							/>
						</div>
						{OwnerState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{OwnerState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleOwnerUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleOwnerUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE Owner ----------------------------------------------------------- */}
			<Dialog
				open={openOwnerDelete}
				onClose={handleOwnerDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusOwner}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="Ownernametest"
						label="Enter the Owner Name to confirm the action"
						variant="outlined"
						type="text"
						value={OwnerState.Ownernametest}
						onChange={handleOwnerDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleOwnerDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={OwnerState.Ownernametest !== focusOwner}
						onClick={() => {
							handleOwnerDelete(focusOwner);
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

export default OwnerPanel;
