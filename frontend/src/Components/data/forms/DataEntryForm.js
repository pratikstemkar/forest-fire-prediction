import React, { useEffect, useState, useContext } from "react";
import { Grid, Button, Checkbox } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import dataEntryService from "../../../Services/dataEntryService";
import { AlertContext } from "../../../Contexts/AlertContext";
import { DataEntryFormValidation } from "../Helpers/FormFunctions";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const DataEntryForm = () => {
	const { setAlert } = useContext(AlertContext);

	const [species, setSpecies] = useState([]);
	const [wildlife, setWildlife] = useState([]);

	const [checked, setChecked] = useState({});
	const [totalNum, setTotalNum] = useState({});

	const [openSpecies, setOpenSpecies] = useState(false);

	const handleClickSpecies = () => {
		setOpenSpecies(true);
	};
	const handleCloseSpecies = () => {
		setOpenSpecies(false);
	};
	const handleTotalNum = (event) => {
		setTotalNum({ ...totalNum, [event.target.name]: event.target.value });

		setDataEntryObject((prevDataEntryObject) => ({
			...prevDataEntryObject,
			species_damaged: prevDataEntryObject.species_damaged.map((specie) =>
				specie.name === event.target.name
					? { ...specie, total_num: event.target.value }
					: specie
			),
		}));
	};
	const handleChangeSpecies = (event) => {
		console.log(typeof event.target.value);
		setChecked({ ...checked, [event.target.value]: event.target.checked });

		console.log(event.target.value);

		if (event.target.checked) {
			setTotalNum({ ...totalNum, [event.target.value]: 0 });
			setDataEntryObject({
				...dataEntryObject,
				species_damaged: [
					...dataEntryObject.species_damaged,
					{
						name: event.target.value,
						total_num: 0,
					},
				],
			});
		} else {
			if (dataEntryObject.species_damaged.length > 0) {
				setTotalNum({ ...totalNum, [event.target.value]: 0 });
				setDataEntryObject({
					...dataEntryObject,
					species_damaged: dataEntryObject.species_damaged.filter(
						(item) => item.name !== event.target.value
					),
				});
			}
		}
	};

	// useEffect(() => {
	// 	console.log(totalNum);
	// }, [totalNum]);

	// useEffect(() => {
	// 	console.log(checked);
	// }, [checked]);

	const [openWildlife, setOpenWildlife] = useState(false);
	const handleClickWildlife = () => {
		setOpenWildlife(true);
	};
	const handleCloseWildlife = () => {
		setOpenWildlife(false);
	};
	const handleTotalNumWild = (event) => {
		setTotalNum({ ...totalNum, [event.target.name]: event.target.value });

		setDataEntryObject((prevDataEntryObject) => ({
			...prevDataEntryObject,
			wildlife_affected: prevDataEntryObject.wildlife_affected.map((wild) =>
				wild.name === event.target.name
					? { ...wild, total_num: event.target.value }
					: wild
			),
		}));
	};
	const handleChangeWildlife = (event) => {
		setChecked({ ...checked, [event.target.value]: event.target.checked });
		setTotalNum({ ...totalNum, [event.target.value]: 0 });

		if (event.target.checked) {
			setDataEntryObject({
				...dataEntryObject,
				wildlife_affected: [
					...dataEntryObject.wildlife_affected,
					{
						name: event.target.value,
						total_num: 0,
					},
				],
			});
		} else {
			if (dataEntryObject.wildlife_affected.length > 0) {
				setDataEntryObject({
					...dataEntryObject,
					wildlife_affected: dataEntryObject.wildlife_affected.filter(
						(item) => item.name !== event.target.value
					),
				});
			}
		}
	};

	const [dataEntryObject, setDataEntryObject] = useState({
		latitude: "",
		longitude: "",
		latD: "",
		latM: 0,
		latS: 0,
		lonD: "",
		lonM: 0,
		lonS: 0,
		record_type: "M",
		date_of_fire: "",
		fire_start_time: "",
		fire_control_date: "",
		fire_control_time: "",
		area_damaged: "",
		species_damaged: [],
		wildlife_affected: [],
		photo_path: "",
		other_info: "",
		submitted: false,
		accepted: false,
		reconsider: false,
		username: JSON.parse(localStorage.getItem("user")).username,
		division: JSON.parse(localStorage.getItem("user")).division,
	});

	useEffect(() => {
		console.log(dataEntryObject);
	}, [dataEntryObject]);

	const [dataEntryError, setDataEntryError] = useState({
		latitude: {
			error: false,
			msg: "",
		},
		longitude: {
			error: false,
			msg: "",
		},
		latD: {
			error: false,
			msg: "",
		},
		latM: {
			error: false,
			msg: "",
		},
		latS: {
			error: false,
			msg: "",
		},
		lonD: {
			error: false,
			msg: "",
		},
		lonM: {
			error: false,
			msg: "",
		},
		lonS: {
			error: false,
			msg: "",
		},
		date_of_fire: {
			error: false,
			msg: "",
		},
		fire_start_time: {
			error: false,
			msg: "",
		},
		fire_control_date: {
			error: false,
			msg: "",
		},
		fire_control_time: {
			error: false,
			msg: "",
		},
		area_damaged: {
			error: false,
			msg: "",
		},
		species_damaged: {
			error: false,
			msg: "",
		},
		wildlife_affected: {
			error: false,
			msg: "",
		},
	});

	const handleChange = (event) => {
		setDataEntryObject({
			...dataEntryObject,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = () => {
		const [errorData, flag] = DataEntryFormValidation(dataEntryObject);
		console.log(errorData, flag);
		setDataEntryError(errorData);
		if (flag) {
			setAlert("Please fill the data correctly!", "error");
		} else {
			dataEntryService
				.postData({
					latitude:
						dataEntryObject.latD +
						";" +
						dataEntryObject.latM +
						";" +
						dataEntryObject.latS,
					longitude:
						dataEntryObject.lonD +
						";" +
						dataEntryObject.lonM +
						";" +
						dataEntryObject.lonS,
					date_of_fire: dataEntryObject.date_of_fire,
					fire_start_time: dataEntryObject.fire_start_time,
					fire_control_date: dataEntryObject.fire_control_date,
					fire_control_time: dataEntryObject.fire_control_time,
					area_damaged: dataEntryObject.area_damaged,
					record_type: "M",
					species_damaged: dataEntryObject.species_damaged,
					wildlife_affected: dataEntryObject.wildlife_affected,
					photo_path: dataEntryObject.photo_path,
					other_info: dataEntryObject.other_info,
					username: JSON.parse(localStorage.getItem("user")).username,
					division: JSON.parse(localStorage.getItem("user")).division,
					submitted: false,
					reconsider: false,
					accepted: false,
				})
				.then((data) => {
					console.log(data);
					setAlert("Data Entry Saved!", "success");
					setTotalNum([]);
					setChecked([]);
					setDataEntryObject({
						longitude: "",
						latitude: "",
						latD: "",
						latM: 0,
						latS: 0,
						lonD: "",
						lonM: 0,
						lonS: 0,
						record_type: "M",
						date_of_fire: "",
						fire_start_time: "",
						fire_control_date: "",
						fire_control_time: "",
						area_damaged: "",
						species_damaged: [],
						wildlife_affected: [],
						photo_path: "",
						other_info: "",
						username: JSON.parse(localStorage.getItem("user")).username,
						division: JSON.parse(localStorage.getItem("user")).division,
						submitted: false,
						reconsider: false,
						accepted: false,
					});
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response);
						if (error.response.data.message.includes("latlong_unq")) {
							setAlert("Latitude and Longitude data already exists!", "error");
						} else {
							setAlert("Couldn't send the data!", "error");
						}
					}
				});
		}
	};

	useEffect(() => {
		console.log(dataEntryObject);
	}, [dataEntryObject]);

	useEffect(() => {
		dataEntryService.getSpeciesData().then((data) => {
			console.log(data);
			setSpecies(data.data);
		});
		dataEntryService.getWildlifeData().then((data) => {
			setWildlife(data.data);
		});
	}, []);

	return (
		<>
			<Grid container className="mt-3">
				<Grid container item justifyContent="space-around" spacing={3}>
					<div className="container m-2">
						<form class="row g-3 needs-validation" novalidate>
							<div className="col-md-6">
								<label for="latD">Latitude(N)</label>
								<div className="input-group">
									<input
										type="number"
										min={0}
										max={90}
										className={
											dataEntryError.latD.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="latD"
										value={dataEntryObject.latD}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">°</span>
									<input
										type="number"
										min={0}
										className={
											dataEntryError.latM.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="latM"
										value={dataEntryObject.latM}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">'</span>
									<input
										type="number"
										min={0}
										className={
											dataEntryError.latS.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="latS"
										value={dataEntryObject.latS}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">''</span>
									<div class="invalid-feedback">
										<small>{dataEntryError.latitude["msg"]}</small>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<label for="lonD">Longitude(E)</label>
								<div className="input-group">
									<input
										type="number"
										min={0}
										max={90}
										className={
											dataEntryError.lonD.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="lonD"
										value={dataEntryObject.lonD}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">°</span>
									<input
										type="number"
										min={0}
										className={
											dataEntryError.lonM.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="lonM"
										value={dataEntryObject.lonM}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">'</span>
									<input
										type="number"
										min={0}
										className={
											dataEntryError.lonS.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="lonS"
										value={dataEntryObject.lonS}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">''</span>
									<div class="invalid-feedback">
										<small>{dataEntryError.longitude["msg"]}</small>
									</div>
								</div>
							</div>
							<div className="col-md-3">
								<label for="date_of_fire">Date of Fire</label>
								<input
									type="date"
									className={
										dataEntryError.date_of_fire.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="date_of_fire"
									value={dataEntryObject.date_of_fire}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.date_of_fire["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="fire_start_time">Fire Start Time</label>
								<input
									type="time"
									className={
										dataEntryError.fire_start_time.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="fire_start_time"
									value={dataEntryObject.fire_start_time}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.fire_start_time["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="fire_control_date">Fire Control Date</label>
								<input
									type="date"
									className={
										dataEntryError.fire_control_date.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="fire_control_date"
									value={dataEntryObject.fire_control_date}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.fire_control_date["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="fire_control_time">Fire Control Time</label>
								<input
									type="time"
									className={
										dataEntryError.fire_control_time.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="fire_control_time"
									value={dataEntryObject.fire_control_time}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.fire_control_time["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="area_damaged">Area Damaged</label>
								<div className="input-group">
									<input
										type="number"
										min={0}
										className={
											dataEntryError.area_damaged.error
												? "form-control is-invalid"
												: "form-control"
										}
										id="area_damaged"
										value={dataEntryObject.area_damaged}
										onChange={handleChange}
										required
									/>
									<span class="input-group-text">ha</span>
									<div class="invalid-feedback">
										<small>{dataEntryError.area_damaged["msg"]}</small>
									</div>
								</div>
							</div>
							<div className="col-md-3">
								<label for="species_damaged">Species Damaged</label>
								<Button
									className={
										dataEntryError.species_damaged.error
											? "form-control is-invalid"
											: "form-control"
									}
									onClick={handleClickSpecies}
								>
									Species
								</Button>
								<div class="invalid-feedback">
									<small>{dataEntryError.species_damaged["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="wildlife_affected">Wildlife Affected</label>
								<Button
									className={
										dataEntryError.wildlife_affected.error
											? "form-control is-invalid"
											: "form-control"
									}
									onClick={handleClickWildlife}
								>
									Wildlife
								</Button>
								<div class="invalid-feedback">
									<small>{dataEntryError.wildlife_affected["msg"]}</small>
								</div>
							</div>
							<div class="col-md-3">
								<label for="photo_path">Upload Photos</label>
								<input
									class="form-control"
									type="file"
									id="photo_path"
									value={dataEntryObject.photo_path}
									onChange={handleChange}
								/>
							</div>
							<div className="col-md-12">
								<label for="other_info">Other Information</label>
								<textarea
									className="form-control"
									id="other_info"
									value={dataEntryObject.other_info}
									onChange={handleChange}
									required
								/>
							</div>
						</form>
					</div>
				</Grid>
				<Grid
					container
					item
					justifyContent="center"
					style={{ marginTop: "3em" }}
				>
					<Button
						variant="contained"
						color="success"
						size="large"
						startIcon={<SaveIcon />}
						onClick={handleSubmit}
					>
						Save Entry
					</Button>
					&nbsp;&nbsp;
				</Grid>
			</Grid>

			{/* ----------------------------- SPECIES DIALOG ----------------------------------------- */}
			<Dialog
				sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
				maxWidth="xs"
				open={openSpecies}
			>
				<DialogTitle>Choose Species</DialogTitle>
				<DialogContent dividers>
					<FormGroup aria-label="species" name="species">
						{species.map((specie) => (
							<div
								style={{
									display: "inline-block",
								}}
							>
								<FormControlLabel
									value={specie.name}
									key={specie.name}
									control={
										<Checkbox
											id="species_name"
											onChange={handleChangeSpecies}
											checked={checked[specie.name]}
										/>
									}
									label={specie.name}
								/>
								<input
									disabled={!checked[specie.name]}
									type="number"
									id="species_count"
									name={specie.name}
									onChange={handleTotalNum}
									value={totalNum[specie.name]}
									min={0}
								/>
							</div>
						))}
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseSpecies}>
						Cancel
					</Button>
					<Button onClick={handleCloseSpecies}>Ok</Button>
				</DialogActions>
			</Dialog>

			{/* ----------------------------- WILDLIFE DIALOG ----------------------------------------- */}
			<Dialog
				sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
				maxWidth="xs"
				open={openWildlife}
			>
				<DialogTitle>Choose Wildlife</DialogTitle>
				<DialogContent dividers>
					<FormGroup aria-label="wildlife" name="wildlife">
						{wildlife.map((wild) => (
							<div
								style={{
									display: "inline-block",
								}}
							>
								<FormControlLabel
									value={wild.name}
									key={wild.name}
									control={
										<Checkbox
											id="wildlife_name"
											onChange={handleChangeWildlife}
											checked={checked[wild.name]}
										/>
									}
									label={wild.name}
								/>
								<input
									disabled={!checked[wild.name]}
									type="number"
									id="wildlife_count"
									name={wild.name}
									onChange={handleTotalNumWild}
									value={totalNum[wild.name]}
									min={0}
								/>
							</div>
						))}
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseWildlife}>
						Cancel
					</Button>
					<Button onClick={handleCloseWildlife}>Ok</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DataEntryForm;
