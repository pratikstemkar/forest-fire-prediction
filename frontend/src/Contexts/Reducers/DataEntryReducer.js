const DataEntryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA_ENTRY":
      return {
        ...state,
        dataEntryObject: action.payload,
      };
    case "ADD_VISUALIZATION_DATA":
      return {
        ...state,
        visualizationData: action.payload,
      };
    default:
      return state;
  }
};

export default DataEntryReducer;
