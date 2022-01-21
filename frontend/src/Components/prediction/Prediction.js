import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PetsIcon from "@mui/icons-material/Pets";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

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
import "leaflet/dist/leaflet.css";
import ModelTraining from "@mui/icons-material/ModelTraining";

const Prediction = () => {
	return (
		<>
			<div className="container">
				<div className="row mt-2">
					<div className="col-2">
						<div className="card" style={{ height: "calc(100vh - 80px)" }}>
							<div className="card-body" style={{ padding: "0px" }}>
								<List disablePadding>
									<ListItem>
										<ListItemText primary="Map Controls" />
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<LocalFireDepartmentIcon />
											</ListItemIcon>
											<ListItemText primary="Fire Points" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<OnlinePredictionIcon />
											</ListItemIcon>
											<ListItemText primary="Fire Prediction" />
										</ListItemButton>
									</ListItem>
								</List>
								<Divider />
								<List>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<QueryStatsIcon />
											</ListItemIcon>
											<ListItemText primary="Fire Statistics" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<ModelTrainingIcon />
											</ListItemIcon>
											<ListItemText primary="Model Training" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<PetsIcon />
											</ListItemIcon>
											<ListItemText primary="Wildlife Data" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<InboxIcon />
											</ListItemIcon>
											<ListItemText primary="Inbox" />
										</ListItemButton>
									</ListItem>
									<ListItem disablePadding>
										<ListItemButton>
											<ListItemIcon>
												<DraftsIcon />
											</ListItemIcon>
											<ListItemText primary="Spam Folder" />
										</ListItemButton>
									</ListItem>
								</List>
							</div>
						</div>
					</div>
					<div className="col-10">
						<div className="card" style={{ height: "calc(100vh - 80px)" }}>
							<div className="card-body" style={{ padding: "0px" }}>
								<MapContainer
									center={[45.4, -75.7]}
									zoom={13}
									scrollWheelZoom={false}
									style={{ height: "calc(100vh - 80px)" }}
								>
									<TileLayer
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
									/>
								</MapContainer>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Prediction;
