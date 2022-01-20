import { createContext, useReducer } from "react";
import DataEntryReducer from "./Reducers/DataEntryReducer";

const INITIAL_STATE = {
  dataEntryObject: [],
  visualizationData: [],
};

export const DataEntryContext = createContext(INITIAL_STATE);

export const DataEntryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataEntryReducer, INITIAL_STATE);

  const setDataEntryObject = (dataEntryObject) => {
    dispatch({
      type: "ADD_DATA_ENTRY",
      payload: dataEntryObject,
    });
  };

  const setVisualizationData = (visualizationData) => {
    dispatch({
      type: "ADD_VISUALIZATION_DATA",
      payload: visualizationData,
    });
  };

  return (
    <DataEntryContext.Provider
      value={{
        dataEntryObject: state.dataEntryObject,
        visualizationData: state.visualizationData,
        setDataEntryObject: setDataEntryObject,
        setVisualizationData: setVisualizationData,
      }}
    >
      {children}
    </DataEntryContext.Provider>
  );
};
