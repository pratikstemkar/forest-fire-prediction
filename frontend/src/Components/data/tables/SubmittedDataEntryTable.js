import React, { useContext, useState } from "react";
import {
	Grid,
	Typography,
	Tabs,
	Tab,
	useTheme,
	Box,
	AppBar,
	Container,
} from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { Submitted_Data_Headers } from "../constants/DataEntryTableColumns";
import { DataGrid } from "@mui/x-data-grid";
import dataEntryService from "../../../Services/dataEntryService";
import { LatLongContext } from "../../../Contexts/LatLongContext";
import SwipeableViews from "react-swipeable-views";
import { DataEntryContext } from "../../../Contexts/DataEntryContext";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: "100%",
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

const StyledDataGrid = withStyles({
	root: {
		".MuiDataGrid-row, .MuiDataGrid-root .MuiDataGrid-cell, .rendering-zone": {
			maxHeight: "none !important",
		},
		".MuiDataGrid-root .MuiDataGrid-window": {
			position: "relative !important",
		},
		".MuiDataGrid-root .MuiDataGrid-viewport": {
			maxHeight: "none !important",
		},
		".MuiDataGrid-root": { height: "auto !important" },
	},
})(DataGrid);

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

const SubmittedDataEntryTable = () => {
	const { dataEntryObject, setDataEntryObject } = useContext(DataEntryContext);
	const { setLatLongData } = useContext(LatLongContext);
	const [submittedDataEntries, setSubmittedDataEntries] = useState([]);
	const [acceptedDataEntries, setAcceptedDataEntries] = useState([]);
	const [reconsideredDataEntries, setReconsideredDataEntries] = useState([]);
	const [value, setValue] = useState(0);
	const classes = useStyles();
	const theme = useTheme();

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	React.useEffect(() => {
		const username = JSON.parse(localStorage.getItem("user")).username;
		setTimeout(() => {
			dataEntryService
				.getData()
				.then((data) => {
					console.log(data);
					setDataEntryObject(data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 1000);
	}, []);

	React.useEffect(() => {
		console.log(submittedDataEntries);
	}, [submittedDataEntries]);

	return (
		<Container className={classes.root}>
			<Grid container className="w-100">
				<div style={{ width: "100%" }}>
					<StyledDataGrid
						rows={dataEntryObject}
						columns={Submitted_Data_Headers}
						// autoPageSize={true}
						autoHeight={true}
						rowsPerPageOptions={[5]}
						disableSelectionOnClick
						loading={dataEntryObject.length > 0 ? false : true}
						onCellClick={(params, event) => {
							event.defaultMuiPrevented = true;
							console.log(params);

							setLatLongData(params.row);
						}}
					/>
				</div>
			</Grid>
		</Container>
	);
};

export default SubmittedDataEntryTable;
