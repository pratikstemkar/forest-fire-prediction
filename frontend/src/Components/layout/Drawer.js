import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField, Button, FormControl } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { styled, useTheme } from "@mui/material/styles";
import { DataEntryContext } from "../../Contexts/DataEntryContext";

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const DrawerComponent = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const { dataEntryObject, setVisualizationData } =
    React.useContext(DataEntryContext);
  const [recordType, setRecordType] = React.useState("");

  React.useEffect(() => {
    console.log(recordType);
  }, [recordType]);

  const setDataForVisualizationMarkers = () => {
    if (recordType === "M") {
      setVisualizationData(
        dataEntryObject.filter(data => data.record_type === "M")
      );
    } else {
      setVisualizationData(
        dataEntryObject.filter(data => data.record_type === "S")
      );
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <Typography style={{ margin: "10px" }}>Fire Inventory</Typography>
        <ListItem>
          <div>
            <Typography>From date</Typography>
            <TextField name="from_date" type={"date"} />
          </div>
          <ListItemText />
        </ListItem>
        <ListItem>
          <div>
            <Typography>To date</Typography>
            <TextField name="from_date" type={"date"} />
          </div>
        </ListItem>
        <Button variant="contained" color="primary" style={{ margin: "12px" }}>
          Submit
        </Button>
      </List>
      <Divider />
      <List>
        <Typography style={{ margin: "10px" }}>Record Type</Typography>
        <ListItem>
          <ListItemIcon>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="record_type"
                defaultValue=""
                name="radio-buttons-group"
                onChange={event => setRecordType(event.target.value)}
              >
                <FormControlLabel
                  value="M"
                  control={<Radio />}
                  label="Manual"
                />
                <FormControlLabel value="S" control={<Radio />} label="SMS" />
              </RadioGroup>
            </FormControl>
          </ListItemIcon>
          <ListItemText />
        </ListItem>
        <Button
          onClick={setDataForVisualizationMarkers}
          variant="contained"
          color="primary"
          style={{ margin: "12px" }}
        >
          Submit
        </Button>
      </List>
      <Divider />
      <List>
        <Typography style={{ margin: "10px" }}>Proximity Analysis</Typography>
        {["Buffer"].map((text, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              {index === 0 ? <LoopIcon /> : <LoopIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerComponent;
