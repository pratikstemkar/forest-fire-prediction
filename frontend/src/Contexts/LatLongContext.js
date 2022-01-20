import { createContext, useReducer } from "react";
import LatLongReducer from "./Reducers/LatLongReducer";

const INITIAL_STATE = {
	latLongData: {},
};

export const LatLongContext = createContext(INITIAL_STATE);

export const LatLongProvider = ({ children }) => {
	const [state, dispatch] = useReducer(LatLongReducer, INITIAL_STATE);

	const setLatLongData = (latLongData) => {
		dispatch({
			type: "SET_LAT_LONG",
			payload: latLongData,
		});
	};

	return (
		<LatLongContext.Provider
			value={{ latLongData: state.latLongData, setLatLongData }}
		>
			{children}
		</LatLongContext.Provider>
	);
};
