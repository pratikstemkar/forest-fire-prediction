import React, { useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import DataEntryForm from "../forms/DataEntryForm";
import SubmittedDataEntryTable from "../tables/SubmittedDataEntryTable";
import { DrawerContext } from "../../../Contexts/DrawerContext";

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

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 1000,
	},
}));

function DataEntryRO(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);
	const { setPathName } = useContext(DrawerContext);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	React.useEffect(() => {
		setPathName(window.location.pathname);
	}, []);

	return (
		<Container style={{ marginTop: "10vh" }} className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Data Entry Module" {...a11yProps(0)} />
					<Tab label="Records Submitted" {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<DataEntryForm />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<SubmittedDataEntryTable />
				</TabPanel>
			</SwipeableViews>
		</Container>
	);
}

export default DataEntryRO;
