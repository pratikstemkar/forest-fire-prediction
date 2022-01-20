import { Grid, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext } from "react";
import { AlertContext } from "../../../Contexts/AlertContext";
import { DataEntryContext } from "../../../Contexts/DataEntryContext";
import { Data_Headers } from "../constants/DataEntryTableColumns";
import dataEntryService from "../../../Services/dataEntryService";

const ButtonToolbar = ({
  toolbarMessage,
  setToolBarMessage,
  params,
  editedDatatableRows,
  setEditedDataTableRows,
  setDataEntryObject,
}) => {
  const { setAlert } = useContext(AlertContext);
  const handleSubmit = () => {
    if (params.length <= 0) {
      setToolBarMessage({
        msg: "Please Select at Least one row to Submit",
        error: true,
      });
    } else {
      const newArr = editedDatatableRows.map((rows) => (rows.submitted = true));
      setEditedDataTableRows(newArr);
      dataEntryService
        .updateData(editedDatatableRows)
        .then((data) => {
          console.log(data);
          setAlert("Record Sucessfully Submitted!", "success");
          const username = JSON.parse(localStorage.getItem("user")).username;
          dataEntryService
            .getRoData(username)
            .then((data) => {
              console.log(data);
              setDataEntryObject(
                data.data.filter((row) => row.submitted === false)
              );
              setEditedDataTableRows(
                data.data.filter((row) => row.submitted === false)
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Grid container justifyContent="space-around">
      <Typography
        style={{ color: toolbarMessage.error ? "red" : "black" }}
        className="mt-2"
      >
        {" "}
        {toolbarMessage.msg}{" "}
      </Typography>
      <Button
        onClick={handleSubmit}
        color="primary"
        className="mt-2"
        variant="contained"
      >
        Submit
      </Button>
    </Grid>
  );
};

const PendingDataEntryTable = () => {
  // const [dataEntryTableRows, setDataEntryTableRows] = React.useState([]);
  const { dataEntryObject, setDataEntryObject } = useContext(DataEntryContext);
  const [editedDatatableRows, setEditedDataTableRows] =
    React.useState(dataEntryObject);
  const [toolbarMessage, setToolBarMessage] = React.useState({
    msg: "Doubleclick or press enter on any cell to edit",
    error: false,
  });
  const [params, setParams] = React.useState([]);

  React.useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user")).username;
    // setTimeout(() => {
    dataEntryService
      .getRoData(username)
      .then((data) => {
        console.log(data);
        const newArr = data.data.filter((row) => row.submitted === false);
        setDataEntryObject(newArr);
        setEditedDataTableRows(
          data.data.filter((row) => row.submitted === false)
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // }, 1000);
  }, []);

  React.useEffect(() => {
    console.log(editedDatatableRows);
  }, [editedDatatableRows]);

  const handleEditRowsModelChange = (newModel) => {
    let newObj = {};
    const newDataEntryTableRows = [];
    Object.keys(newModel).map((key) =>
      Object.keys(newModel[key]).map(
        (value) => {
          for (let i = 0; i < editedDatatableRows.length; i++) {
            if (editedDatatableRows[i].id === parseInt(key, 10)) {
              // console.log(editedDatatableRows[i]);
              if (
                value === "longitude" ||
                value === "latitude" ||
                value === "area_damaged"
              ) {
                newObj = {
                  ...editedDatatableRows[i],
                  [value]: parseFloat(newModel[key][value].value),
                };
              } else if (value.includes("date")) {
                let date = new Date(newModel[key][value].value);
                // console.log(date.toISOString());
                newObj = {
                  ...editedDatatableRows[i],
                  [value]: new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .split("T")[0],
                };
              } else if (
                value === "species_damaged" ||
                value === "wildlife_affected"
              ) {
                console.log(value);
                let newArr = newModel[key][value].value.map((data) => {
                  return {
                    ...data,
                    total_num: 100,
                  };
                });

                newObj = {
                  ...editedDatatableRows[i],
                  [value]: newArr,
                };
              } else {
                newObj = {
                  ...editedDatatableRows[i],
                  [value]: newModel[key][value].value,
                };
              }
              console.log(newModel);
              newDataEntryTableRows.push(newObj);
            } else {
              newDataEntryTableRows.push(editedDatatableRows[i]);
            }
          }
          setEditedDataTableRows(newDataEntryTableRows);
          setDataEntryObject(newDataEntryTableRows);
        }
        // console.log(
        //   dataEntryTableRows.find(rows => rows.id === parseInt(keys, 10))
        // )
      )
    );
  };

  const handleRowClick = (params) => {
    setParams(params);
    console.log(params);
    if (params.length > 0) {
      const newArr = [];
      for (let i = 0; i < params.length; i++) {
        let newObj = dataEntryObject.find((rows) => rows.id === params[i]);
        console.log(newObj);
        newArr.push(newObj);
      }
      setEditedDataTableRows(newArr);
    }
  };

  return (
    <Grid container className="w-100">
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={dataEntryObject}
          columns={Data_Headers}
          // autoPageSize={true}
          autoHeight={true}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          loading={dataEntryObject.length > 0 ? false : true}
          onEditRowsModelChange={handleEditRowsModelChange}
          onSelectionModelChange={handleRowClick}
          components={{
            Toolbar: ButtonToolbar,
          }}
          componentsProps={{
            toolbar: {
              toolbarMessage,
              setToolBarMessage,
              params,
              editedDatatableRows,
              setEditedDataTableRows,
              setDataEntryObject,
            },
          }}
        />
      </div>
    </Grid>
  );
};

export default React.memo(PendingDataEntryTable);
