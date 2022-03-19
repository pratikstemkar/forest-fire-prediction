import { Avatar, Chip, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Data_Headers = [
	{ field: "id", headerName: "ID", width: 100, editable: true, type: "number" },
	{
		field: "latitude",
		headerName: "Latitude",
		width: 150,
		editable: true,
	},
	{
		field: "longitude",
		headerName: "Longitutde",
		width: 150,
		editable: true,
	},
	{
		field: "record_type",
		headerName: "Record Type",
		width: 150,
		editable: true,
	},
	{
		field: "date_of_fire",
		headerName: "Date of fire",
		type: "date",
		width: 160,
		editable: true,
	},
	{
		field: "fire_start_time",
		headerName: "Fire start time",
		width: 180,
		editable: true,
	},
	{
		field: "fire_control_date",
		headerName: "Fire control date",
		type: "date",
		width: 180,
		editable: true,
	},
	{
		field: "fire_control_time",
		headerName: "FIre control time",
		width: 180,
		editable: true,
	},
	{
		field: "area_damaged",
		headerName: "Area damaged",
		width: 170,
		editable: true,
	},
	{
		field: "species_damaged",
		headerName: "Specied damaged",
		width: 180,
		editable: true,
		height: 200,
		renderCell: (params) => {
			return (
				<Grid container>
					{params.row.species_damaged.map((species) => (
						<Chip
							avatar={<Avatar>{species.total_num}</Avatar>}
							label={species.name}
						/>
					))}
				</Grid>
			);
		},
	},
	{
		field: "wildlife_affected",
		headerName: "Wildlife Affected",
		width: 150,
		editable: true,
		height: 200,
		renderCell: (params) => {
			return (
				<Grid container>
					{params.row.wildlife_affected.map((wildlife) => (
						<Chip
							avatar={<Avatar>{wildlife.total_num}</Avatar>}
							label={wildlife.name}
						/>
					))}
				</Grid>
			);
		},
	},
	{
		field: "photo_path",
		headerName: "Photo",
		width: 150,
		editable: true,
	},
	{
		field: "other_info",
		headerName: "Other Remarks",
		width: 200,
		editable: true,
	},
];

export const Submitted_Data_Headers = [
	// { field: "id", headerName: "ID", width: 100, editable: true, type: "number" },

	{
		field: "latitude",
		headerName: "Latitude",
		width: 150,
	},
	{
		field: "longitude",
		headerName: "Longitutde",
		width: 150,
	},
	{
		field: "source_system_type",
		headerName: "Source System Type",
		width: 150,
	},
	{
		field: "source_system",
		headerName: "Source System",
		width: 150,
	},
	{
		field: "nwcg_reporting_agency",
		headerName: "NWCG Reporting Agency",
		width: 150,
	},
	{
		field: "discovery_date",
		headerName: "Discovery Date",
		type: "date",
		width: 150,
	},
	{
		field: "discovery_time",
		headerName: "Discovery Time",
		width: 150,
	},
	{
		field: "control_date",
		headerName: "Control Date",
		width: 150,
	},
	{
		field: "control_time",
		headerName: "Control Time",
		width: 150,
	},
	{
		field: "state",
		headerName: "State",
		width: 150,
	},
	{
		field: "stat_cause_code",
		headerName: "Stat Cause Code",
		width: 150,
	},
	{
		field: "owner_code",
		headerName: "Owner Code",
		width: 150,
	},
];
