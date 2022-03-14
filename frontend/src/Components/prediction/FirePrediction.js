import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
	LayerGroup,
	Circle,
} from "react-leaflet";
import PropTypes from "prop-types";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import L from "leaflet";
import axios from "axios";
import {
	API_URL,
	GFCAUSE_URL,
	GNWCG_URL,
	GOWNER_URL,
	GSSYS_URL,
} from "../../constants";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#FF3D00" : "#FF9E80",
	},
}));

function LinearProgressWithLabel(props) {
	const [state, setState] = useState({
		nwcgList: [],
		sysSourceList: [],
		fireCauseList: [],
		ownerList: [],
		error: "",
	});

	useEffect(() => {
		axios
			.get(`${API_URL}${GNWCG_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						nwcgList: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						nwcgList: [],
						error: "NWCG Not Loaded.",
					}));
				}
			});

		axios
			.get(`${API_URL}${GSSYS_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						sysSourceList: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						sysSourceList: [],
						error: "Source System Not Loaded.",
					}));
				}
			});

		axios
			.get(`${API_URL}${GFCAUSE_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						fireCauseList: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						fireCauseList: [],
						error: "Fire Cause Not Loaded.",
					}));
				}
			});

		axios
			.get(`${API_URL}${GOWNER_URL}`)
			.then(function (response) {
				if (response.status === 200) {
					setState((prevState) => ({
						...prevState,
						ownerList: response.data,
						error: "",
					}));
				}
			})
			.catch(function (error) {
				if (error.response) {
					setState((prevState) => ({
						...prevState,
						ownerList: [],
						error: "Owner Not Loaded.",
					}));
				}
			});
	}, []);

	return (
		<>
			<div className="row">
				<div className="col d-flex">
					{"Lat: "}
					{props.loc.lat.toFixed(3)}
					<br />
					{"Lng: "}
					{props.loc.lng.toFixed(3)}
					<span
						class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
						onClick={() => {
							props.resetLoc();
							props.setLoad(false);
							props.setRes(false);
						}}
					>
						X<span class="visually-hidden">Reset Coordinates</span>
					</span>
					<div className="col">
						{props.result ? (
							<BorderLinearProgress
								className="m-3"
								variant="determinate"
								{...props}
							/>
						) : (
							<>
								{props.loading ? (
									<BorderLinearProgress className="m-3" />
								) : (
									<h4 className="font-monospace text-warning m-2 text-center">
										Select the parameters below and click on Predict.
									</h4>
								)}
							</>
						)}
					</div>
					{props.result ? (
						<div className="my-2">{`${Math.round(props.value)}%`}</div>
					) : null}
				</div>
			</div>
			{props.result ? null : (
				<div className="align-items-center mt-2">
					<div className="col d-flex">
						<input
							class="form-control me-2"
							list="datalistNWCG"
							id="NWCGDataList"
							placeholder="NWCG Reporting"
						/>
						<datalist id="datalistNWCG">
							{state.nwcgList.map((nwcg) => (
								<option key={nwcg.id} value={nwcg.name}>
									{nwcg.name}
								</option>
							))}
						</datalist>
						<input
							class="form-control me-2"
							list="datalistFireCause"
							id="FireCauseDataList"
							placeholder="Fire Cause"
						/>
						<datalist id="datalistFireCause">
							{state.fireCauseList.map((fireCause) => (
								<option key={fireCause.id} value={fireCause.name}>
									{fireCause.name}
								</option>
							))}
						</datalist>
						<input
							class="form-control me-2"
							list="datalistSysSource"
							id="SysSourceDataList"
							placeholder="System Source"
						/>
						<datalist id="datalistSysSource">
							{state.sysSourceList.map((sys) => (
								<option key={sys.id} value={sys.name}>
									{sys.name}
								</option>
							))}
						</datalist>
						<input
							class="form-control me-2"
							list="datalistOwner"
							id="OwnerDataList"
							placeholder="Owner"
						/>
						<datalist id="datalistOwner">
							{state.ownerList.map((owner) => (
								<option key={owner.id} value={owner.name}>
									{owner.name}
								</option>
							))}
						</datalist>

						<button
							class="btn btn-success"
							type="button"
							disabled={props.loading}
							onClick={() => {
								props.setLoad(true);
								setTimeout(() => {
									props.setLoad(false);
									props.setRes(true);
								}, 5000);
							}}
						>
							<div className="row">
								<div className="col d-flex align-items-center">
									{props.loading ? (
										<>
											<span
												class="spinner-border spinner-border-sm"
												role="status"
												aria-hidden="true"
											></span>
											&nbsp;Predicting...
										</>
									) : (
										"Predict"
									)}
								</div>
							</div>
						</button>
					</div>
				</div>
			)}
		</>
	);
}

LinearProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired,
};

const markerIcon = new L.Icon({
	iconUrl:
		"https://cdn.discordapp.com/attachments/909801322436505600/936221183257501696/marker.png",
	iconSize: [25, 40],
	iconAnchor: [10, 42],
	// popupAnchor: [10, 100],
});

const FirePrediction = () => {
	const [progress, setProgress] = useState(0);
	const [loc, setLoc] = useState(null);
	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState(false);

	const fillBlueOptions = { fillColor: "blue" };
	const fillRedOptions = { fillColor: "red" };

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 0 : prevProgress + 1
			);
		}, 100);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const setLoad = (loading) => {
		setLoading(loading);
	};

	const setRes = (result) => {
		setResult(result);
	};

	const resetLoc = () => {
		setLoc(null);
	};

	const ClickComponent = () => {
		const map = useMapEvents({
			click: (e) => {
				map.locate();
				setLoc({
					coords: e.latlng,
				});
			},
		});
		return loc === null ? null : (
			<>
				<Marker position={loc.coords} icon={markerIcon}>
					<Popup>Hello</Popup>
					{result ? (
						<LayerGroup>
							<Circle
								center={loc.coords}
								pathOptions={fillBlueOptions}
								radius={400}
							/>
							<Circle
								center={loc.coords}
								pathOptions={fillRedOptions}
								radius={200}
								stroke={false}
							/>
						</LayerGroup>
					) : null}
				</Marker>
			</>
		);
	};

	return (
		<>
			<div className="card" style={{ height: "calc(100vh - 80px)" }}>
				<div className="card-body" style={{ padding: "0px" }}>
					<div>
						<MapContainer
							center={[18.484598, 73.890232]}
							zoom={13}
							scrollWheelZoom={true}
							style={{ height: "calc(100vh - 80px)" }}
						>
							<LayersControl position="topright">
								<LayersControl.BaseLayer checked name="OSM">
									<TileLayer
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
								</LayersControl.BaseLayer>
								<LayersControl.BaseLayer name="MapTiler Street Map">
									<TileLayer
										attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
										url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
									/>
								</LayersControl.BaseLayer>
								<LayersControl.BaseLayer name="Google Map">
									<TileLayer
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
									/>
								</LayersControl.BaseLayer>
								<LayersControl.BaseLayer name="MapTiler Topography">
									<TileLayer
										attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
										url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
									/>
								</LayersControl.BaseLayer>
								<LayersControl.BaseLayer name="MapTiler Hybrid">
									<TileLayer
										attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
										url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=ZwUohaY0M43TShPZZw1q"
									/>
								</LayersControl.BaseLayer>
							</LayersControl>
							<ClickComponent />
						</MapContainer>
					</div>
					<div
						className="container-fluid"
						style={{
							position: "absolute",
							bottom: 15,
							zIndex: 314159,
						}}
					>
						<div className="card shadow-lg bg-body">
							<div className="card-body">
								<div className="card-text">
									{loc === null ? (
										<h6 className="text-center lead text-danger">
											Click on Map to select coordinates for prediction.
										</h6>
									) : (
										<LinearProgressWithLabel
											value={progress}
											loc={loc === null ? null : loc.coords}
											resetLoc={resetLoc}
											loading={loading}
											result={result}
											setLoad={setLoad}
											setRes={setRes}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FirePrediction;
