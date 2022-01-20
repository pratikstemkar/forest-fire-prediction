export const DataEntryFormValidation = DataEntryObject => {
  let errorObj = {
    longitude: {
      error: false,
      msg: "",
    },
    latitude: {
      error: false,
      msg: "",
    },
    latD: {
      error: false,
      msg: "",
    },
    latM: {
      error: false,
      msg: "",
    },
    latS: {
      error: false,
      msg: "",
    },
    lonD: {
      error: false,
      msg: "",
    },
    lonM: {
      error: false,
      msg: "",
    },
    lonS: {
      error: false,
      msg: "",
    },
    record_type: {
      error: false,
      msg: "",
    },
    date_of_fire: {
      error: false,
      msg: "",
    },
    fire_start_time: {
      error: false,
      msg: "",
    },
    fire_control_date: {
      error: false,
      msg: "",
    },
    fire_control_time: {
      error: false,
      msg: "",
    },
    area_damaged: {
      error: false,
      msg: "",
    },
    species_damaged: {
      error: false,
      msg: "",
    },
    wildlife_affected: {
      error: false,
      msg: "",
    },
  };
  let flag = false;

  Object.keys(DataEntryObject).forEach(label => {
    if (
      label !== "photo_path" &&
      label !== "other_info" &&
      label !== "submitted" &&
      label !== "username" &&
      label !== "division" &&
      label !== "latitude" &&
      label !== "longitude" &&
      label !== "record_type"
    ) {
      if (DataEntryObject[label].length === 0) {
        errorObj[label].error = true;
        errorObj[label].msg = `${label} cannot be empty`;
        flag = true;
      }

      if(label === 'latD' || label === 'latM' || label === 'latS'){
        if(DataEntryObject[label] < 0){
          errorObj.latD.error=true
          errorObj.latitude.error = true;
          errorObj.latitude.msg = `Latitude cannot be negative.`;
          flag = true;
        }
        if(DataEntryObject[label] === ''){
          errorObj.latitude.error = true;
          errorObj.latitude.msg = `Latitude cannot be empty.`;
          flag = true;
          console.log('XXX')
        }
      }
      if(label === 'lonD' || label === 'lonM' || label === 'lonS'){
        if(DataEntryObject[label] < 0){
          errorObj.lonD.error=true
          errorObj.longitude.error = true;
          errorObj.longitude.msg = `Longitude cannot be negative.`;
          flag = true;
        }
        if(DataEntryObject[label] === ''){
          errorObj.longitude.error = true;
          errorObj.longitude.msg = `Longitude cannot be empty.`;
          flag = true;
        }
      }
      if(label === 'area_damaged'){
        if(DataEntryObject.area_damaged < 0){
          errorObj.area_damaged.error = true;
          errorObj.area_damaged.msg = `Area Damaged cannot be negative.`;
          flag = true;
        }
      }
    }
    

  });

  return [errorObj, flag];
};
