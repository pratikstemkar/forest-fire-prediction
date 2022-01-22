import React from "react";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
} from "react-leaflet";

const FireCount = () => {
	return (
		<>
			<div className="card" style={{ height: "calc(100vh - 80px)" }}>
				<div className="card-body" style={{ padding: "0px" }}>
					<MapContainer
						center={[45.4, -75.7]}
						zoom={13}
						scrollWheelZoom={true}
						style={{ height: "calc(100vh - 80px)" }}
					>
						<Marker position={[45.4, -75.7]}>
							<Popup>
								<div>
									<h4>Hello</h4>
								</div>
							</Popup>
						</Marker>
						<LayersControl position="topright">
							<LayersControl.BaseLayer checked name="OSM">
								<TileLayer
									attribution="© OpenStreetMap contributors"
									url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJpeWFua2ExMjEwOTIiLCJhIjoiY2trbWQxY3h1MnBwMDJvbW5iNW96eTlrcCJ9.scUQlt1OTvRBxmshXeldaQ"
								/>
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name="Google Map">
								<TileLayer
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
									url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
								/>
							</LayersControl.BaseLayer>
							<LayersControl.BaseLayer name="MapTiler">
								<TileLayer
									attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
									url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=ZwUohaY0M43TShPZZw1q"
								/>
							</LayersControl.BaseLayer>
						</LayersControl>
					</MapContainer>
				</div>
			</div>
		</>
	);
};

export default FireCount;
