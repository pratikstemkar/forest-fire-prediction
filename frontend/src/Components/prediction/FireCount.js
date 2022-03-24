import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	LayerGroup,
	Circle,
	Tooltip,
} from "react-leaflet";
import * as L from "leaflet";
import dataEntryService from "../../Services/dataEntryService";
import predictionService from "../../Services/predictionService";

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
	return (
		<>
			{props.loading ? (
				<>
					<div className="row">
						<div className="col d-flex">
							<div className="col">
								<BorderLinearProgress className="m-3" variant="indeterminate" />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<center>
								<small>
									<div>{`Prediction is in progress. Please wait patiently for the prediction to end. `}</div>
								</small>
							</center>
						</div>
					</div>
				</>
			) : (
				<>
					<span
						class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
						onClick={() => {
							props.closeCard();
						}}
					>
						X<span class="visually-hidden">Reset</span>
					</span>
					{props.result
						? props.result.map((r) => (
								<div key={r.LATITUDE}>
									<b>Predicted Class: </b>
									{r.PREDICTED_CLASS}
									<br />
									<b>Area Range: </b>
									{r.AREA_RANGE}
								</div>
						  ))
						: "An error occured."}
				</>
			)}
		</>
	);
}

const FireCount = () => {
	const [state, setState] = useState({
		loading: false,
		showCard: false,
		result: [],
		data: [],
		map: null,
		simulatePoint: null,
	});

	var myIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png",
		iconSize: [30, 30],
	});

	useEffect(() => {
		dataEntryService.getData().then((data) => {
			setState((prevState) => ({
				...prevState,
				data: data.data,
			}));
		});
	}, []);

	const corner1 = L.latLng(-90, -200);
	const corner2 = L.latLng(90, 200);
	const bounds = L.latLngBounds(corner1, corner2);

	const predictFire = (predictData) => {
		setState((prevState) => ({
			...prevState,
			loading: true,
			showCard: true,
		}));
		// Call to Python Server
		console.log(predictData);

		predictionService.postData(predictData).then((data) => {
			setState((prevState) => ({
				...prevState,
				result: data.data,
				loading: false,
			}));
			console.log(data.data[0].AREA_RANGE);
			dataEntryService
				.updateData({
					id: predictData.ID,
					fire_size: data.data[0].AREA_RANGE,
					fire_size_class: data.data[0].PREDICTED_CLASS,
				})
				.then(() => {
					dataEntryService.getData().then((data) => {
						setState((prevState) => ({
							...prevState,
							data: data.data,
						}));
					});
				});
			console.log(state.data);
		});
	};

	const simulateFire = (simulateData) => {
		if (state.map) {
			state.map.flyTo([simulateData.latitude, simulateData.longitude], 16, {
				animate: true,
				duration: 3,
			});
			setTimeout(() => {
				setState((prevState) => ({
					...prevState,
					simulatePoint: simulateData.id,
				}));
			}, 3000);
		}
	};

	const closeCard = () => {
		setState((prevState) => ({
			...prevState,
			showCard: false,
			loading: false,
			result: [],
		}));
	};

	return (
		<>
			<div style={{ height: "calc(100vh - 80px)" }}>
				<div style={{ padding: "0px" }}>
					<MapContainer
						center={[37.0902, -95.7129]}
						zoom={4}
						scrollWheelZoom={true}
						style={{ height: "calc(100vh - 65px)" }}
						minZoom={2}
						maxBounds={bounds}
						maxBoundsViscosity={1.0}
						whenCreated={(map) =>
							setState((prevState) => ({ ...prevState, map: map }))
						}
					>
						{state.data.map((p) => {
							return (
								<Marker
									position={[p.latitude, p.longitude]}
									icon={myIcon}
									key={p.id}
								>
									<Popup closeButton={false} offset={L.point(0, -8)}>
										<div>
											<h4>Fire ID #{p.id}</h4>
											<p>
												<b>Source System Type: </b>
												{p.source_system_type}
												<br />
												<b>Source System: </b>
												{p.source_system}
												<br />
												<b>NWCG Reporting Agency: </b>
												{p.nwcg_reporting_agency}
												<br />
												<b>Discovery Date: </b>
												{p.discovery_date}
												<br />
												<b>Discovery Time: </b>
												{p.discovery_time}
												<br />
												{p.cont_date !== null ? (
													<>
														<b>Control Date: </b>
														{p.cont_date}
														<br />
													</>
												) : null}
												{p.cont_time !== "" ? (
													<>
														<b>Control Time: </b>
														{p.cont_time}
														<br />
													</>
												) : null}
												<b>State: </b>
												{p.state}
												<br />
												<b>Stat Cause Code: </b>
												{p.stat_cause_code}
												<br />
												<b>Owner Code: </b>
												{p.owner_code}
												<br />

												{p.fire_size_class !== null ? (
													<>
														<b>Fire Class: </b>
														{p.fire_size_class}
														<br />
													</>
												) : null}
												{p.fire_size_class === null ? (
													<>
														<center>
															<button
																className="btn btn-primary mt-2"
																onClick={() => {
																	predictFire({
																		ID: p.id,
																		SOURCE_SYSTEM_TYPE: p.source_system_type,
																		SOURCE_SYSTEM: p.source_system,
																		NWCG_REPORTING_AGENCY:
																			p.nwcg_reporting_agency,
																		STAT_CAUSE_CODE: p.stat_cause_code,
																		LATITUDE: p.latitude,
																		LONGITUDE: p.longitude,
																		OWNER_CODE: p.owner_code,
																		STATE: p.state,
																		DISCOVERY_DATE: p.discovery_date,
																		DISCOVERY_TIME: p.discovery_time,
																	});
																}}
																disabled={state.loading}
															>
																{state.loading ? (
																	<>
																		<span
																			class="spinner-border spinner-border-sm"
																			role="status"
																			aria-hidden="true"
																		></span>
																		&nbsp; Predicting...
																	</>
																) : (
																	"Predict"
																)}
															</button>
														</center>
													</>
												) : (
													<>
														<center>
															<button
																className="btn btn-success mt-2"
																onClick={() => {
																	simulateFire(p);
																}}
																disabled={state.loading}
															>
																{state.loading ? (
																	<>
																		<span
																			class="spinner-border spinner-border-sm"
																			role="status"
																			aria-hidden="true"
																		></span>
																		&nbsp; Simulating...
																	</>
																) : (
																	"Simulate"
																)}
															</button>
														</center>
													</>
												)}
											</p>
										</div>
									</Popup>
									{state.simulatePoint === p.id ? (
										<LayerGroup>
											<Circle
												center={[p.latitude, p.longitude]}
												pathOptions={{ fillColor: "blue" }}
												radius={400}
											>
												<Tooltip
													direction="bottom"
													offset={[0, 20]}
													opacity={1}
													permanent={false}
												>
													{p.fire_size}
												</Tooltip>
											</Circle>
											<Circle
												center={[p.latitude, p.longitude]}
												pathOptions={{ fillColor: "red" }}
												radius={200}
												stroke={false}
											>
												<Tooltip
													direction="bottom"
													offset={[0, 20]}
													opacity={1}
													permanent={false}
												>
													{p.fire_size}
												</Tooltip>
											</Circle>
										</LayerGroup>
									) : null}
								</Marker>
							);
						})}
						<LayersControl position="topright">
							<LayersControl.BaseLayer name="OSM">
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer checked name="MapTiler Street Map">
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
					</MapContainer>
				</div>
				{state.showCard ? (
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
									<LinearProgressWithLabel
										data={state.data}
										loading={state.loading}
										result={state.result}
										closeCard={closeCard}
									/>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
};

export default FireCount;
