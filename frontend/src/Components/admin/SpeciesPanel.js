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
import { API_URL, GSPEC_URL, SPEC_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const SpeciesPanel = (props) => {
	const { addspecies, updatespecies, deletespecies } = useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [speciesState, setSpeciesState] = useState({
		searchspecies: "",
		specieslist: [],
		error: "",
		speciesnametest: "",
		update: 1,
	});

	const [openSpeciesAdd, setOpenSpeciesAdd] = useState(false);
	const [openSpeciesUpdate, setOpenSpeciesUpdate] = useState(false);
	const [openSpeciesDelete, setOpenSpeciesDelete] = useState(false);
	const [focusSpecies, setFocusSpecies] = useState();

	const [addSpecies, setAddSpecies] = useState({
		speciesname: "",
		speciesalias: "",
		speciesimg: "",
	});

	const [updateSpecies, setUpdateSpecies] = useState({
		speciesid: "",
		speciesname: "",
		speciesalias: "",
		speciesimg: "",
	});

	// SEARCH SPECIES
	const handleSearchSpecies = (e) => {
		const { id, value } = e.target;
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			[id]: value,
		}));
	};

	// ADD SPECIES
	const handleSpeciesAddChange = (e) => {
		const { id, value } = e.target;
		setAddSpecies((prevAddSpecies) => ({
			...prevAddSpecies,
			[id]: value,
		}));
	};

	const handleSpeciesAddOpen = () => {
		setOpenSpeciesAdd(true);
	};

	const handleSpeciesAddClose = () => {
		setOpenSpeciesAdd(false);
		setAddSpecies((prevAddSpecies) => ({
			speciesname: "",
			speciesalias: "",
			speciesimg: "",
		}));
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			error: "",
		}));
	};

	const handleAddSpecies = () => {
		if (addSpecies.speciesname === "") {
			setSpeciesState((prevSpeciesState) => ({
				...prevSpeciesState,
				error: "Species Name field should not be empty.",
			}));
		} else if (addSpecies.speciesalias === "") {
			setSpeciesState((prevSpeciesState) => ({
				...prevSpeciesState,
				error: "Species Alias field should not be empty.",
			}));
		} else {
			addspecies(
				addSpecies.speciesname,
				addSpecies.speciesalias,
				addSpecies.speciesimg
			);
			console.log(addSpecies.speciesname);
			setSpeciesState((prevSpeciesState) => ({
				...prevSpeciesState,
				error: "",
				update: prevSpeciesState.update + 1,
			}));
			setOpenSpeciesAdd(false);
			setAddSpecies((prevAddSpecies) => ({
				speciesname: "",
				speciesalias: "",
				speciesimg: "",
			}));
		}
	};

	// UPDATE SPECIES
	const handleSpeciesUpdateOpen = (speciesname) => {
		axios.get(`${API_URL}${SPEC_URL}${speciesname}`).then(function (response) {
			if (response.status === 200) {
				setUpdateSpecies({
					speciesid: response.data.id,
					speciesname: response.data.name,
					speciesalias: response.data.alias,
					speciesimg: response.data.img,
				});
				console.log(response.data);
			} else {
				console.log("error");
			}
		});
		setOpenSpeciesUpdate(true);
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			update: prevSpeciesState.update + 1,
		}));
		setFocusSpecies(speciesname);
	};

	const handleSpeciesUpdateClose = () => {
		setOpenSpeciesUpdate(false);
		setFocusSpecies();
	};

	const handleSpeciesUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateSpecies((prevSpecies) => ({
			...prevSpecies,
			[id]: value,
		}));
	};

	const handleSpeciesUpdate = () => {
		if (updateSpecies.speciesname === "") {
			setSpeciesState((prevSpeciesState) => ({
				...prevSpeciesState,
				error: "Species Name field should not be empty.",
			}));
		} else {
			updatespecies(
				updateSpecies.speciesid,
				updateSpecies.speciesname,
				updateSpecies.speciesalias,
				updateSpecies.speciesimg
			);

			setFocusSpecies();
			if (!props.loading) {
				setOpenSpeciesUpdate(false);
			}
			setSpeciesState((prevSpeciesState) => ({
				...prevSpeciesState,
				error: "",
				update: prevSpeciesState.update + 1,
			}));
		}
	};

	// DELETE SPECIES
	const handleSpeciesDelete = (speciesname) => {
		deletespecies(speciesname);
		setOpenSpeciesDelete(false);
		setFocusSpecies();
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			speciesnametest: "",
			update: prevSpeciesState.update + 1,
		}));
	};

	const handleSpeciesDeleteOpen = (speciesname) => {
		setOpenSpeciesDelete(true);
		setFocusSpecies(speciesname);
	};

	const handleSpeciesDeleteClose = () => {
		setOpenSpeciesDelete(false);
		setFocusSpecies();
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			speciesnametest: "",
		}));
	};

	const handleSpeciesDeleteChange = (e) => {
		const { id, value } = e.target;
		setSpeciesState((prevSpeciesState) => ({
			...prevSpeciesState,
			[id]: value,
		}));
	};

	// LOAD SPECIES AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GSPEC_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setSpeciesState((prevSpeciesState) => ({
						...prevSpeciesState,
						specieslist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setSpeciesState((prevSpeciesState) => ({
						...prevSpeciesState,
						specieslist: [],
						error: "Species Not Loaded.",
					}));
				}
			});

		console.log(speciesState.specieslist);
	}, [speciesState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openSpecies}
				onClose={props.handleSpeciesClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="error">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleSpeciesClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Species
						</Typography>
						<Button
							autoFocus
							color="inherit"
							onClick={props.handleSpeciesClose}
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
						onClick={handleSpeciesAddOpen}
					>
						Add Species
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchspecies"
							placeholder="Search Species"
							value={speciesState.searchspecies}
							onChange={handleSearchSpecies}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{speciesState.specieslist
							.filter((val) => {
								if (speciesState.searchspecies === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(speciesState.searchspecies.toLowerCase())
								) {
									return val;
								}
							})
							.map((species) => (
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
													image={species.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography sx={{ fontSize: 14 }} gutterBottom>
														{species.id}
													</Typography>
													<Typography variant="h5" component="div">
														{species.name}
													</Typography>
													<Typography variant="body2">
														{species.alias}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleSpeciesUpdateOpen(species.name);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleSpeciesDeleteOpen(species.name);
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

			{/* ----------------------------------------------------------------- ADD SPECIES ----------------------------------------------------------------- */}
			<Dialog open={openSpeciesAdd} onClose={handleSpeciesAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Species</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new Species, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="speciesname">Species Name</label>
							<input
								id="speciesname"
								type="text"
								value={addSpecies.speciesname}
								onChange={handleSpeciesAddChange}
								className="form-control"
								placeholder="Enter Species Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="speciesalias">Species Alias</label>
							<input
								id="speciesalias"
								type="text"
								value={addSpecies.speciesalias}
								onChange={handleSpeciesAddChange}
								className="form-control"
								placeholder="Enter Species Alias"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="speciesimg">Species Image</label>
							<input
								id="speciesimg"
								type="text"
								value={addSpecies.speciesimg}
								onChange={handleSpeciesAddChange}
								className="form-control"
								placeholder="Enter Species Image"
							/>
						</div>
						{speciesState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{speciesState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSpeciesAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddSpecies}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE SPECIES ----------------------------------------------------------- */}
			<Dialog
				open={openSpeciesUpdate}
				onClose={handleSpeciesUpdateClose}
				fullWidth
			>
				<DialogTitle>
					<h4>
						<b>Update Species</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Species.</p>
					<form>
						<div className="form-group mt-2">
							<label for="speciesid">Species ID</label>
							<input
								id="speciesid"
								type="text"
								value={updateSpecies.speciesid}
								onChange={handleSpeciesUpdateChange}
								className="form-control"
								placeholder="Enter Species ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="speciesname">Species Name</label>
							<input
								id="speciesname"
								type="text"
								value={updateSpecies.speciesname}
								onChange={handleSpeciesUpdateChange}
								className="form-control"
								placeholder="Enter Species Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="speciesalias">Species Alias</label>
							<input
								id="speciesalias"
								type="text"
								value={updateSpecies.speciesalias}
								onChange={handleSpeciesUpdateChange}
								className="form-control"
								placeholder="Enter Species Alias"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="speciesimg">Species Image</label>
							<input
								id="speciesimg"
								type="text"
								value={updateSpecies.speciesimg}
								onChange={handleSpeciesUpdateChange}
								className="form-control"
								placeholder="Enter Species Image"
							/>
						</div>
						{speciesState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{speciesState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSpeciesUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleSpeciesUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE SPECIES ----------------------------------------------------------- */}
			<Dialog
				open={openSpeciesDelete}
				onClose={handleSpeciesDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusSpecies}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="speciesnametest"
						label="Enter the Species Name to confirm the action"
						variant="outlined"
						type="text"
						value={speciesState.speciesnametest}
						onChange={handleSpeciesDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleSpeciesDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={speciesState.speciesnametest !== focusSpecies}
						onClick={() => {
							handleSpeciesDelete(focusSpecies);
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

export default SpeciesPanel;
