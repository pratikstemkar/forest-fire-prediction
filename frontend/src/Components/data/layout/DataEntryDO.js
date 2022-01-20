import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
	AppBar,
	Container,
	Typography,
	Grid,
	Tabs,
	Tab,
	Box,
	useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SwipeableViews from "react-swipeable-views";
import { DataGrid } from "@mui/x-data-grid";
import { Submitted_Data_Headers } from "../constants/DataEntryTableColumns";
import dataEntryService from "../../../Services/dataEntryService";
import { LatLongContext } from "../../../Contexts/LatLongContext";
import { DataEntryContext } from "../../../Contexts/DataEntryContext";
import { DrawerContext } from "../../../Contexts/DrawerContext";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 1000,
		marginTop: "4em",
	},
	AppBar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	Tab: {
		width: "100%",
	},
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

// const ButtonToolBar = () => {
//   return (
//     <Grid container justifyContent="flex-end" className="p-3">
//       <Link to="/visualise">
//         <Button color="primary" variant="contained" className="me-4">
//           Visulaise
//         </Button>
//       </Link>
//       {/* <Button color="primary" variant="contained">
//         Simulate
//       </Button> */}
//     </Grid>
//   );
// };

const DataEntryDO = () => {
	const { dataEntryObject, setDataEntryObject } = useContext(DataEntryContext);
	const [acceptedDataEntries, setAcceptedDataEntries] = useState([]);
	const [reconsideredDataEntries, setReconsideredDataEntries] = useState([]);
	const { setLatLongData } = useContext(LatLongContext);
	const [value, setValue] = useState(0);
	const { setPathName } = useContext(DrawerContext);
	const classes = useStyles();
	const theme = useTheme();

	React.useEffect(() => {
		const division = JSON.parse(localStorage.getItem("user")).division;
		setTimeout(() => {
			dataEntryService
				.getDoData(division)
				.then((data) => {
					console.log(data);
					setDataEntryObject(
						data.data.filter(
							(data) =>
								data.submitted === true &&
								data.accepted === false &&
								data.reconsider === false
						)
					);
					setAcceptedDataEntries(
						data.data.filter((data) => data.accepted === true)
					);
					setReconsideredDataEntries(
						data.data.filter((data) => data.reconsider === true)
					);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 1000);
	}, []);

	React.useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	React.useEffect(() => {
		console.log(dataEntryObject);
	}, [dataEntryObject]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Container className={classes.root}>
			<AppBar
				position="static"
				style={{ backgroundColor: "white" }}
				className={classes.AppBar}
			>
				<Tabs
					className={classes.Tab}
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Submitted entries" {...a11yProps(0)} />
					<Tab label="Accepted entries" {...a11yProps(1)} />
					<Tab label="Reconsidered entries" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Grid container className="w-100">
						<div style={{ width: "100%" }}>
							<DataGrid
								rows={dataEntryObject}
								columns={Submitted_Data_Headers}
								// autoPageSize={true}
								autoHeight={true}
								rowsPerPageOptions={[5]}
								disableSelectionOnClick
								loading={false}
								checkboxSelection
								onCellClick={(params, event) => {
									event.defaultMuiPrevented = true;
									console.log(params);

									setLatLongData(params.row);
								}}
							/>
						</div>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Grid container className="w-100">
						<div style={{ width: "100%" }}>
							<DataGrid
								rows={acceptedDataEntries}
								columns={Submitted_Data_Headers}
								// autoPageSize={true}
								autoHeight={true}
								rowsPerPageOptions={[5]}
								disableSelectionOnClick
								loading={acceptedDataEntries.length > 0 ? false : true}
								checkboxSelection
								onCellClick={(params, event) => {
									event.defaultMuiPrevented = true;
									console.log(params);

									setLatLongData(params.row);
								}}
							/>
						</div>
					</Grid>
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<Grid container className="w-100">
						<div style={{ width: "100%" }}>
							<DataGrid
								rows={reconsideredDataEntries}
								columns={Submitted_Data_Headers}
								// autoPageSize={true}
								autoHeight={true}
								rowsPerPageOptions={[5]}
								disableSelectionOnClick
								loading={reconsideredDataEntries.length > 0 ? false : true}
								checkboxSelection
								onCellClick={(params, event) => {
									event.defaultMuiPrevented = true;
									console.log(params);

									setLatLongData(params.row);
								}}
							/>
						</div>
					</Grid>
				</TabPanel>
			</SwipeableViews>
		</Container>
	);
};

export default DataEntryDO;
