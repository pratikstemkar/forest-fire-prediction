const LatLongReducer = (state, action) => {
  switch (action.type) {
    case "SET_LAT_LONG":
      return {
        ...state,
        latLongData: action.payload,
      };
    default:
      return state;
  }
};

export default LatLongReducer;
