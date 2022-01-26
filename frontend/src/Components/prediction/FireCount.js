import React from "react";
import {
	MapContainer,
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	useMap,
} from "react-leaflet";
import * as L from "leaflet";

const FireCount = () => {
	var myIcon = L.icon({
		iconUrl:
			"https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png",
		iconSize: [40, 40],
	});

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
						<Marker position={[45.4, -75.7]} icon={myIcon}>
							<Popup closeButton={false} offset={L.point(0, -8)}>
								<div>
									<h4>Hello</h4>
									<p>
										This is demo. This is demo. This is demo. This is demo. This
										is demo.
									</p>
								</div>
							</Popup>
						</Marker>
						<Marker position={[65.4, -85.7]} icon={myIcon}>
							<Popup closeButton={false} offset={L.point(0, -8)}>
								<div>
									<h4>Hello</h4>
									<p>
										This is demo. This is demo. This is demo. This is demo. This
										is demo.
									</p>
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
