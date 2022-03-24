import React, { useEffect, useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import dataEntryService from "../../../Services/dataEntryService";
import { AlertContext } from "../../../Contexts/AlertContext";
import { DataEntryFormValidation } from "../Helpers/FormFunctions";

const DataEntryForm = () => {
	const { setAlert } = useContext(AlertContext);

	const [sst, setSst] = useState([]);
	const [ss, setSs] = useState([]);
	const [nwcg, setNwcg] = useState([]);
	const [st, setSt] = useState([
		"AL",
		"AK",
		"AZ",
		"AR",
		"CA",
		"CO",
		"CT",
		"DE",
		"DC",
		"FL",
		"GA",
		"HI",
		"ID",
		"IL",
		"IN",
		"IA",
		"KS",
		"KY",
		"LA",
		"ME",
		"MD",
		"MA",
		"MI",
		"MN",
		"MS",
		"MO",
		"MT",
		"NE",
		"NV",
		"NH",
		"NJ",
		"NM",
		"NY",
		"NC",
		"ND",
		"OH",
		"OK",
		"OR",
		"PA",
		"PR",
		"RI",
		"SC",
		"SD",
		"TN",
		"TX",
		"UT",
		"VT",
		"VA",
		"WA",
		"WV",
		"WI",
		"WY",
	]);
	const [fc, setFc] = useState([]);
	const [own, setOwn] = useState([]);

	useEffect(() => {
		dataEntryService.getSourceSystemType().then((data) => {
			console.log(data.data);
			setSst(data.data);
		});
		dataEntryService.getSourceSystem().then((data) => {
			console.log(data.data);
			setSs(data.data);
		});
		dataEntryService.getNWCGReportingAgency().then((data) => {
			console.log(data.data);
			setNwcg(data.data);
		});
		dataEntryService.getStatCauseCode().then((data) => {
			console.log(data.data);
			setFc(data.data);
		});
		dataEntryService.getOwnerCode().then((data) => {
			console.log(data.data);
			setOwn(data.data);
		});
	}, []);

	const [dataEntryObject, setDataEntryObject] = useState({
		latitude: "",
		longitude: "",
		source_system_type: "FED",
		source_system: "DOI-WFMI",
		nwcg_reporting_agency: "FS",
		discovery_date: "",
		discovery_time: "",
		cont_date: "",
		cont_time: "",
		state: "AL",
		stat_cause_code: "Miscellaneous",
		owner_code: "USFS",
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
		source_system_type: {
			error: false,
			msg: "",
		},
		source_system: {
			error: false,
			msg: "",
		},
		nwcg_reporting_agency: {
			error: false,
			msg: "",
		},
		discovery_date: {
			error: false,
			msg: "",
		},
		discovery_time: {
			error: false,
			msg: "",
		},
		cont_date: {
			error: false,
			msg: "",
		},
		cont_time: {
			error: false,
			msg: "",
		},
		state: {
			error: false,
			msg: "",
		},
		stat_cause_code: {
			error: false,
			msg: "",
		},
		owner_code: {
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
					latitude: dataEntryObject.latitude,
					longitude: dataEntryObject.longitude,
					source_system_type: dataEntryObject.source_system_type,
					source_system: dataEntryObject.source_system,
					nwcg_reporting_agency: dataEntryObject.nwcg_reporting_agency,
					discovery_date: dataEntryObject.discovery_date,
					discovery_time: dataEntryObject.discovery_time,
					cont_date: dataEntryObject.cont_date,
					cont_time: dataEntryObject.cont_time,
					state: dataEntryObject.state,
					stat_cause_code: dataEntryObject.stat_cause_code,
					owner_code: dataEntryObject.owner_code,
				})
				.then((data) => {
					console.log(data);
					setAlert("Data Entry Saved!", "success");
					setDataEntryObject({
						longitude: "",
						latitude: "",
						source_system_type: "",
						source_system: "",
						nwcg_reporting_agency: "",
						discovery_date: "",
						discovery_time: "",
						cont_date: "",
						cont_time: "",
						state: "",
						stat_cause_code: "",
						owner_code: "",
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

	return (
		<>
			<Grid container className="mt-3">
				<Grid container item justifyContent="space-around" spacing={3}>
					<div className="container m-2">
						<form class="row g-3 needs-validation" novalidate>
							<div className="col-md-6">
								<label for="latitude">Latitude</label>
								<input
									type="number"
									className={
										dataEntryError.latitude.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="latitude"
									value={dataEntryObject.latitude}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.latitude["msg"]}</small>
								</div>
							</div>
							<div className="col-md-6">
								<label for="longitude">Longitude</label>
								<input
									type="number"
									className={
										dataEntryError.longitude.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="longitude"
									value={dataEntryObject.longitude}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.longitude["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="source_system_type">Source System Type</label>
								<select
									type="text"
									className={
										dataEntryError.source_system_type.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="source_system_type"
									value={dataEntryObject.source_system_type}
									onChange={handleChange}
									required
								>
									{sst.map((s) => (
										<option>{s.name}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.source_system_type["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="source_system">Source System</label>
								<select
									type="text"
									className={
										dataEntryError.source_system.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="source_system"
									value={dataEntryObject.source_system}
									onChange={handleChange}
									required
								>
									{ss.map((s) => (
										<option>{s.name}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.source_system["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="nwcg_reporting_agency">NWCG Reporting Agency</label>
								<select
									type="text"
									className={
										dataEntryError.nwcg_reporting_agency.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="nwcg_reporting_agency"
									value={dataEntryObject.nwcg_reporting_agency}
									onChange={handleChange}
									required
								>
									{nwcg.map((n) => (
										<option>{n.name}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.nwcg_reporting_agency["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="discovery_date">Discovery Date</label>
								<input
									type="date"
									className={
										dataEntryError.discovery_date.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="discovery_date"
									value={dataEntryObject.discovery_date}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.discovery_date["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="discovery_time">Discovery Time</label>
								<input
									type="time"
									className={
										dataEntryError.discovery_time.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="discovery_time"
									value={dataEntryObject.discovery_time}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.discovery_time["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="cont_date">Control Date</label>
								<input
									type="date"
									className={
										dataEntryError.cont_date.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="cont_date"
									value={dataEntryObject.cont_date}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.cont_date["msg"]}</small>
								</div>
							</div>
							<div className="col-md-3">
								<label for="cont_time">Control Time</label>
								<input
									type="time"
									className={
										dataEntryError.cont_time.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="cont_time"
									value={dataEntryObject.cont_time}
									onChange={handleChange}
									required
								/>
								<div class="invalid-feedback">
									<small>{dataEntryError.cont_time["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="state">State</label>
								<select
									type="text"
									className={
										dataEntryError.state.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="state"
									value={dataEntryObject.state}
									onChange={handleChange}
									required
								>
									{st.map((s) => (
										<option>{s}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.state["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="stat_cause_code">Stat Cause Code</label>
								<select
									type="text"
									className={
										dataEntryError.stat_cause_code.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="stat_cause_code"
									value={dataEntryObject.stat_cause_code}
									onChange={handleChange}
									required
								>
									{fc.map((f) => (
										<option>{f.name}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.stat_cause_code["msg"]}</small>
								</div>
							</div>
							<div className="col-md-4">
								<label for="owner_code">Owner Code</label>
								<select
									type="text"
									className={
										dataEntryError.owner_code.error
											? "form-control is-invalid"
											: "form-control"
									}
									id="owner_code"
									value={dataEntryObject.owner_code}
									onChange={handleChange}
									required
								>
									{own.map((o) => (
										<option>{o.name}</option>
									))}
								</select>
								<div class="invalid-feedback">
									<small>{dataEntryError.owner_code["msg"]}</small>
								</div>
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
		</>
	);
};

export default DataEntryForm;
