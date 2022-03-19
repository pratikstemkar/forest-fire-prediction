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
import FireCount from "./FireCount";

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
			{/* <div className="container"> */}
			{/* <div className="row"> */}
			{/* <div className="col-2">
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
										<ListItemText primary="Fire Func" />
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
								</List>
							</div>
						</div>
					</div> */}
			{/* <div className="col"> */}
			<FireCount />
			{/* </div> */}
			{/* </div> */}
			{/* </div> */}
		</>
	);
};

export default Prediction;
