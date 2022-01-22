import React from "react";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
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

import { Outlet, Link } from "react-router-dom";

const Prediction = () => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [open1, setOpen1] = React.useState(true);
	const [open2, setOpen2] = React.useState(true);
	const [open3, setOpen3] = React.useState(true);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	const handleClick1 = () => {
		setOpen1(!open1);
	};
	const handleClick2 = () => {
		setOpen2(!open2);
	};
	const handleClick3 = () => {
		setOpen3(!open3);
	};

	return (
		<>
			<div className="container">
				<div className="row mt-2">
					<div className="col-2">
						<div className="card" style={{ height: "calc(100vh - 80px)" }}>
							<div className="card-body" style={{ padding: "0px" }}>
								<List
									disablePadding
									subheader={
										<ListSubheader component="div">Map Functions</ListSubheader>
									}
								>
									<Divider />
									<ListItemButton onClick={handleClick1}>
										<ListItemIcon>
											<InboxIcon />
										</ListItemIcon>
										<ListItemText primary="Category 1" />
										{open1 ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse in={open1} timeout="auto" unmountOnExit>
										<List disablePadding>
											<ListItem disablePadding>
												<ListItemButton
													component="a"
													href="/prediction/firecount"
													selected={
														window.location.pathname === "/prediction/firecount"
													}
													onClick={(event) => handleListItemClick(event, 0)}
												>
													<ListItemIcon>
														<LocalFireDepartmentIcon />
													</ListItemIcon>
													<ListItemText primary="Fire Points" />
												</ListItemButton>
											</ListItem>
											<ListItem disablePadding>
												<ListItemButton
													component="a"
													href="/prediction/fireprediction"
													selected={
														window.location.pathname ===
														"/prediction/fireprediction"
													}
													onClick={(event) => handleListItemClick(event, 1)}
												>
													<ListItemIcon>
														<OnlinePredictionIcon />
													</ListItemIcon>
													<ListItemText primary="Fire Prediction" />
												</ListItemButton>
											</ListItem>
										</List>
									</Collapse>
									<Divider />
									<ListItemButton onClick={handleClick2}>
										<ListItemIcon>
											<InboxIcon />
										</ListItemIcon>
										<ListItemText primary="Category 2" />
										{open2 ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse in={open2} timeout="auto" unmountOnExit>
										<List disablePadding>
											<ListItem disablePadding>
												<ListItemButton
													component="a"
													href="/prediction/firestatistics"
													selected={
														window.location.pathname ===
														"/prediction/firestatistics"
													}
													onClick={(event) => handleListItemClick(event, 2)}
												>
													<ListItemIcon>
														<QueryStatsIcon />
													</ListItemIcon>
													<ListItemText primary="Fire Statistics" />
												</ListItemButton>
											</ListItem>
											<ListItem disablePadding>
												<ListItemButton
													selected={selectedIndex === 3}
													onClick={(event) => handleListItemClick(event, 3)}
												>
													<ListItemIcon>
														<ModelTrainingIcon />
													</ListItemIcon>
													<ListItemText primary="Model Training" />
												</ListItemButton>
											</ListItem>
											<ListItem disablePadding>
												<ListItemButton
													selected={selectedIndex === 4}
													onClick={(event) => handleListItemClick(event, 4)}
												>
													<ListItemIcon>
														<PetsIcon />
													</ListItemIcon>
													<ListItemText primary="Wildlife Data" />
												</ListItemButton>
											</ListItem>
										</List>
									</Collapse>
									<Divider />
									<ListItemButton onClick={handleClick3}>
										<ListItemIcon>
											<InboxIcon />
										</ListItemIcon>
										<ListItemText primary="Category 3" />
										{open3 ? <ExpandLess /> : <ExpandMore />}
									</ListItemButton>
									<Collapse in={open3} timeout="auto" unmountOnExit>
										<List disablePadding>
											<ListItem disablePadding>
												<ListItemButton
													selected={selectedIndex === 5}
													onClick={(event) => handleListItemClick(event, 5)}
												>
													<ListItemIcon>
														<InboxIcon />
													</ListItemIcon>
													<ListItemText primary="Inbox" />
												</ListItemButton>
											</ListItem>
											<ListItem disablePadding>
												<ListItemButton
													selected={selectedIndex === 6}
													onClick={(event) => handleListItemClick(event, 6)}
												>
													<ListItemIcon>
														<DraftsIcon />
													</ListItemIcon>
													<ListItemText primary="Spam Folder" />
												</ListItemButton>
											</ListItem>
										</List>
									</Collapse>
								</List>
							</div>
						</div>
					</div>
					<div className="col-10">
						{window.location.pathname === "/prediction" ? (
							<div className="text-center">
								<img
									src="https://cdn.discordapp.com/attachments/909801322436505600/934361954343071744/man-finding-way-from-paper-map-with-boy-holding-lantern.png"
									style={{ height: "80%" }}
									alt="Illus"
								/>
							</div>
						) : (
							<Outlet />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Prediction;
