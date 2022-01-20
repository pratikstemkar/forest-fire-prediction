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
import { API_URL, GRANGE_URL, RANGE_URL } from "../../constants";
import { AuthContext } from "../../Contexts/AuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const RangePanel = (props) => {
	const { addrange, updaterange, deleterange } = useContext(AuthContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [rangeState, setRangeState] = useState({
		searchrange: "",
		rangelist: [],
		error: "",
		rangenametest: "",
		update: 1,
	});

	const [openRangeAdd, setOpenRangeAdd] = useState(false);
	const [openRangeUpdate, setOpenRangeUpdate] = useState(false);
	const [openRangeDelete, setOpenRangeDelete] = useState(false);
	const [focusRange, setFocusRange] = useState();

	const [addRange, setAddRange] = useState({
		rangename: "",
		rangedescription: "",
		rangeimg: "",
	});

	const [updateRange, setUpdateRange] = useState({
		rangeid: "",
		rangename: "",
		rangedescription: "",
		rangeimg: "",
	});

	// SEARCH RANGE
	const handleSearchRange = (e) => {
		const { id, value } = e.target;
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			[id]: value,
		}));
	};

	// ADD RANGE
	const handleRangeAddChange = (e) => {
		const { id, value } = e.target;
		setAddRange((prevAddRange) => ({
			...prevAddRange,
			[id]: value,
		}));
	};

	const handleRangeAddOpen = () => {
		setOpenRangeAdd(true);
	};

	const handleRangeAddClose = () => {
		setOpenRangeAdd(false);
		setAddRange((prevAddRange) => ({
			rangename: "",
			rangedescription: "",
			rangeimg: "",
		}));
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			error: "",
		}));
	};

	const handleAddRange = () => {
		if (addRange.rangename === "") {
			setRangeState((prevRangeState) => ({
				...prevRangeState,
				error: "Range Name field should not be empty.",
			}));
		} else {
			addrange(
				addRange.rangename,
				addRange.rangedescription,
				addRange.rangeimg
			);
			console.log(addRange.rangename);
			setRangeState((prevRangeState) => ({
				...prevRangeState,
				error: "",
				update: prevRangeState.update + 1,
			}));
			setOpenRangeAdd(false);
			setAddRange((prevAddUser) => ({
				rangename: "",
				rangedescription: "",
				rangeimg: "",
			}));
		}
	};

	// UPDATE RangE
	const handleRangeUpdateOpen = (rangename) => {
		axios.get(`${API_URL}${RANGE_URL}${rangename}`).then(function (response) {
			if (response.status === 200) {
				setUpdateRange({
					rangeid: response.data.id,
					rangename: response.data.name,
					rangedescription: response.data.description,
					rangeimg: response.data.img,
				});
				console.log(response.data);
			} else {
				console.log("error");
			}
		});
		setOpenRangeUpdate(true);
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			update: prevRangeState.update + 1,
		}));
		setFocusRange(rangename);
	};

	const handleRangeUpdateClose = () => {
		setOpenRangeUpdate(false);
		setFocusRange();
	};

	const handleRangeUpdateChange = (e) => {
		const { id, value } = e.target;
		setUpdateRange((prevRange) => ({
			...prevRange,
			[id]: value,
		}));
	};

	const handleRangeUpdate = () => {
		if (updateRange.rangename === "") {
			setRangeState((prevRangeState) => ({
				...prevRangeState,
				error: "Range Name field should not be empty.",
			}));
		} else {
			updaterange(
				updateRange.rangeid,
				updateRange.rangename,
				updateRange.rangedescription,
				updateRange.rangeimg
			);

			setFocusRange();
			if (!props.loading) {
				setOpenRangeUpdate(false);
			}
			setRangeState((prevRangeState) => ({
				...prevRangeState,
				error: "",
				update: prevRangeState.update + 1,
			}));
		}
	};

	// DELETE RangE
	const handleRangeDelete = (rangename) => {
		deleterange(rangename);
		setOpenRangeDelete(false);
		setFocusRange();
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			rangenametest: "",
			update: prevRangeState.update + 1,
		}));
	};

	const handleRangeDeleteOpen = (rangename) => {
		setOpenRangeDelete(true);
		setFocusRange(rangename);
	};

	const handleRangeDeleteClose = () => {
		setOpenRangeDelete(false);
		setFocusRange();
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			rangenametest: "",
		}));
	};

	const handleRangeDeleteChange = (e) => {
		const { id, value } = e.target;
		setRangeState((prevRangeState) => ({
			...prevRangeState,
			[id]: value,
		}));
	};

	// LOAD RangES AT RELOAD
	useEffect(() => {
		axios
			.get(`${API_URL}${GRANGE_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setRangeState((prevRangeState) => ({
						...prevRangeState,
						rangelist: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setRangeState((prevRangeState) => ({
						...prevRangeState,
						rangelist: [],
						error: "Ranges Not Loaded.",
					}));
				}
			});

		console.log(rangeState.rangelist);
	}, [rangeState.update]);

	return (
		<>
			<Dialog
				fullScreen
				open={props.openRange}
				onClose={props.handleRangeClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: "relative" }} color="secondary">
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.handleRangeClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
							Ranges
						</Typography>
						<Button autoFocus color="inherit" onClick={props.handleRangeClose}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				<div className="container mt-4">
					<Button
						color="success"
						startIcon={<AddBoxRoundedIcon />}
						variant="contained"
						onClick={handleRangeAddOpen}
					>
						Add Range
					</Button>

					<div className="mt-2">
						<input
							className="form-control form-control-lg"
							type="text"
							id="searchrange"
							placeholder="Search Range"
							value={rangeState.searchrange}
							onChange={handleSearchRange}
						/>
					</div>

					<div className="row mt-2 mb-4 align-items-center">
						{rangeState.rangelist
							.filter((val) => {
								if (rangeState.searchrange === "") {
									return val;
								} else if (
									val.name
										.toLowerCase()
										.includes(rangeState.searchrange.toLowerCase())
								) {
									return val;
								}
							})
							.map((range) => (
								<div className="col-md-3">
									<center>
										<Card className="mb-2" sx={{ maxWidth: 300 }}>
											<CardActionArea>
												<CardMedia
													component="img"
													height="140"
													image={range.img}
													alt="green iguana"
												/>
												<CardContent>
													<Typography gutterBottom variant="h5" component="div">
														{range.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{range.description}
													</Typography>
												</CardContent>
											</CardActionArea>
											<CardActions>
												<IconButton
													aria-label="update"
													size="large"
													color="primary"
													onClick={() => {
														handleRangeUpdateOpen(range.name);
													}}
												>
													<CreateIcon fontSize="small" />
												</IconButton>{" "}
												<IconButton
													aria-label="delete"
													size="large"
													color="error"
													onClick={() => {
														handleRangeDeleteOpen(range.name);
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

			{/* ----------------------------------------------------------------- ADD RANGE ----------------------------------------------------------------- */}
			<Dialog open={openRangeAdd} onClose={handleRangeAddClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Add Range</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">
						To add a new range, enter all the details in the form.
					</p>
					<form>
						<div className="form-group mt-2">
							<label for="rangename">Range Name</label>
							<input
								id="rangename"
								type="text"
								value={addRange.rangename}
								onChange={handleRangeAddChange}
								className="form-control"
								placeholder="Enter Range Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rangedescription">Range Description</label>
							<input
								id="rangedescription"
								type="text"
								value={addRange.rangedescription}
								onChange={handleRangeAddChange}
								className="form-control"
								placeholder="Enter Range Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rangeimg">Range Image</label>
							<input
								id="rangeimg"
								type="text"
								value={addRange.rangeimg}
								onChange={handleRangeAddChange}
								className="form-control"
								placeholder="Enter Range Image"
							/>
						</div>
						{rangeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{rangeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRangeAddClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleAddRange}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Role
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- UPDATE RANGE ----------------------------------------------------------- */}
			<Dialog open={openRangeUpdate} onClose={handleRangeUpdateClose} fullWidth>
				<DialogTitle>
					<h4>
						<b>Update Range</b>
					</h4>
				</DialogTitle>
				<DialogContent>
					<p className="text-muted">Update the Details of the Range.</p>
					<form>
						<div className="form-group mt-2">
							<label for="rangeid">Range ID</label>
							<input
								id="rangeid"
								type="text"
								value={updateRange.rangeid}
								onChange={handleRangeUpdateChange}
								className="form-control"
								placeholder="Enter Range ID"
								disabled
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rangename">Range Name</label>
							<input
								id="rangename"
								type="text"
								value={updateRange.rangename}
								onChange={handleRangeUpdateChange}
								className="form-control"
								placeholder="Enter Range Name"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rangedescription">Range Description</label>
							<input
								id="rangedescription"
								type="text"
								value={updateRange.rangedescription}
								onChange={handleRangeUpdateChange}
								className="form-control"
								placeholder="Enter Range Description"
							/>
						</div>
						<div className="form-group mt-2">
							<label for="rangeimg">Range Image</label>
							<input
								id="rangeimg"
								type="text"
								value={updateRange.rangeimg}
								onChange={handleRangeUpdateChange}
								className="form-control"
								placeholder="Enter Range Image"
							/>
						</div>
						{rangeState.error.length > 0 ? (
							<Alert severity="error" className="mt-2">
								{rangeState.error}
							</Alert>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRangeUpdateClose}
						variant="outlined"
						color="primary"
					>
						Cancel
					</Button>
					<LoadingButton
						color="success"
						onClick={handleRangeUpdate}
						loading={props.loading}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Save Changes
					</LoadingButton>
				</DialogActions>
			</Dialog>

			{/* -------------------------------------------------------------- DELETE RANGE ----------------------------------------------------------- */}
			<Dialog
				open={openRangeDelete}
				onClose={handleRangeDeleteClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{`Delete ${focusRange}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						This action is permanent and cannot be undone. Decide cautiously.
					</DialogContentText>
					<TextField
						className="mt-3"
						fullWidth
						id="rangenametest"
						label="Enter the Range Name to confirm the action"
						variant="outlined"
						type="text"
						value={rangeState.rangenametest}
						onChange={handleRangeDeleteChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleRangeDeleteClose}
						color="primary"
						variant="outlined"
					>
						Cancel
					</Button>
					<Button
						color="error"
						disabled={rangeState.rangenametest !== focusRange}
						onClick={() => {
							handleRangeDelete(focusRange);
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

export default RangePanel;
