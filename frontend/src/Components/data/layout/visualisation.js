import React, { useContext } from "react";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	WMSTileLayer,
	MapConsumer,
	Marker,
	Popup,
} from "react-leaflet";
import L from "leaflet";
import { Button } from "reactstrap";
import "leaflet/dist/leaflet.css";
import WindyLayer from "./VelocityLayer";
import "leaflet-velocity";
import jsonData from "../constants/water-gbr2.json";
import GeoRasterLayer from "georaster-layer-for-leaflet";
import { tiffImages } from "../constants/tiffImages";
import ProgressBarExample from "./progressbar/progressbar";
import { LatLongContext } from "../../../Contexts/LatLongContext";
import { DataEntryContext } from "../../../Contexts/DataEntryContext";
import { AlertContext } from "../../../Contexts/AlertContext";
import { DrawerContext } from "../../../Contexts/DrawerContext";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import dataEntryService from "../../../Services/dataEntryService";
import DrawerComponent from "../../layout/Drawer";
const parseGeoraster = require("georaster");

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const Visualization = () => {
	const { setPathName } = useContext(DrawerContext);
	const [showGeoraster, setShowGeoraster] = React.useState(false);
	// const [georasterLayer, setGeorasterLayer] = React.useState(
	//   new GeoRasterLayer()
	// );
	const { dataEntryObject, visualizationData, setVisualizationData } =
		useContext(DataEntryContext);
	const { latLongData } = useContext(LatLongContext);
	const { setAlert } = useContext(AlertContext);
	const { open, setDrawerState } = useContext(DrawerContext);
	const add_geoTiff = () => {
		setShowGeoraster(true);
	};

	const remove_geoTiff = () => {
		setShowGeoraster(false);
	};

	const handleAccept = () => {
		let newArr = dataEntryObject
			.filter((data) => data.id === latLongData.id)
			.map((data) => ({ ...data, accepted: true }));
		console.log(newArr);
		dataEntryService
			.updateData(newArr)
			.then((data) => {
				console.log(data);
				setAlert("Added to accepted entries", "success");
			})
			.catch((error) => {
				console.error(error);
				setAlert("Failed to Add to accepted entries", "error");
			});
	};

	const handleReconsider = () => {
		let newArr = dataEntryObject
			.filter((data) => data.id === latLongData.id)
			.map((data) => ({ ...data, reconsider: true }));
		dataEntryService
			.updateData(newArr)
			.then((data) => {
				console.log(data);
				setAlert("Added to reconsider entries", "success");
			})
			.catch((error) => {
				console.error(error);
				setAlert("Failed to Add to reconsider entries", "error");
			});
	};

	const handleClose = () => {
		setDrawerState(false);
	};

	React.useEffect(() => {
		setVisualizationData(dataEntryObject);
	}, []);

	React.useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	return (
		<div>
			{JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_DFO") && (
				<ProgressBarExample
					switchLayersToMap={add_geoTiff}
					reset_geotiff={remove_geoTiff}
				/>
			)}
			<DrawerComponent open={open} handleDrawerClose={handleClose} />

			<MapContainer
				className="map-container"
				// center={center}
				zoom={8}
				scrollWheelZoom={false}
				style={{
					height: "calc(100vh - 8.6vh)",
					// marginLeft: "-7.5vw",
					padding: "0 !important",
					margin: "0 !important",
					// width: "100vw",
				}}
			>
				<MapConsumer>
					{(map) => {
						map.setView(
							[latLongData.latitude, latLongData.longitude],
							map.getZoom()
						);
						return null;
					}}
				</MapConsumer>
				{visualizationData.map((data) => (
					<Marker position={[data.latitude, data.longitude]} />
				))}
				<Marker position={[latLongData.latitude, latLongData.longitude]}>
					<Popup>
						{"Latitude:- " + latLongData.latitude + "°N"}
						<br />
						{"Longitude:- " + latLongData.longitude + "°E"}
						<br />
						{"Date of fire:- " + latLongData.date_of_fire}
						<br />
						{"Fire start time:- " + latLongData.fire_start_time}
						<br />
						{"Fire control date:- " + latLongData.fire_control_date}
						<br />
						{"Fire control time:- " + latLongData.fire_control_time}
						<br />
						{"Species damaged:- " + JSON.stringify(latLongData.species_damaged)}
						<br />
						{"Wildlife Affected:- " +
							JSON.stringify(latLongData.wildlife_affected)}
						<br />
						{JSON.parse(localStorage.getItem("user")).roles ===
							"[ROLE_DFO]" && (
							<div>
								{latLongData.accepted !== true && (
									<Button
										style={{ marginTop: "1rem" }}
										color="success"
										onClick={handleAccept}
									>
										Accept
									</Button>
								)}
								{latLongData.reconsider !== true && (
									<Button
										style={{ marginTop: "1rem", marginLeft: "1rem" }}
										color="danger"
										onClick={handleReconsider}
									>
										Reconsider
									</Button>
								)}
							</div>
						)}
					</Popup>
				</Marker>
				<LayersControl position="topright">
					<LayersControl.BaseLayer checked name="OSM">
						<TileLayer
							attribution="© OpenStreetMap contributors"
							url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJpeWFua2ExMjEwOTIiLCJhIjoiY2trbWQxY3h1MnBwMDJvbW5iNW96eTlrcCJ9.scUQlt1OTvRBxmshXeldaQ"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.BaseLayer name="Google map">
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
						/>
					</LayersControl.BaseLayer>
					<LayersControl.Overlay name="Distric Boundaries">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:Districts"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Range bound">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:Sikkim_range_bound_new"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay checked name="Roads">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:Sikkim_Roads"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Settlements">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:Settlements"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Firepoints">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:Firepoints"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Fire Maltim">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:fire_Maltim_SFIRE_based"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="forestarea">
						<WMSTileLayer
							url={"http://10.208.26.240:8080/geoserver/ForestFire/wms"}
							layers="ForestFire:foresarea"
							format="image/png"
							transparent={true}
						/>
					</LayersControl.Overlay>
					<LayersControl.Overlay name="Windy Layer">
						<WindyLayer
							displayValues={true}
							displayOptions={{
								velocityType: "GBR Wind",
								displayPosition: "bottomright",
								displayEmptyString: "No wind data",
							}}
							data={jsonData}
							maxVlocity={10}
							minVelocity={0}
							opacity={1}
						/>
					</LayersControl.Overlay>
				</LayersControl>
				{
					showGeoraster ? (
						<MapConsumer>
							{(map) => {
								tiffImages.forEach((image) => {
									fetch(image.image)
										.then((response) => response.arrayBuffer())
										.then((arrayBuffer) => {
											parseGeoraster(arrayBuffer).then((georaster) => {
												let layer = new GeoRasterLayer({
													georaster: georaster,
													opacity: 0.5,
													resolution: 2100,
												});
												showGeoraster
													? map.addLayer(layer)
													: map.removeLayer(layer);
											});
										});
								});
								return null;
							}}
						</MapConsumer>
					) : null
					// (
					//   <MapConsumer>
					//     {map => {
					//       map.removeLayer(georasterLayer);
					//       return null;
					//     }}
					//   </MapConsumer>
					// )
				}
			</MapContainer>
		</div>
	);
};

export default Visualization;
