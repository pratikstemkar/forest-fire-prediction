import { createContext, useReducer } from "react";
import DrawerReducer from "./Reducers/DrawerReducer";

const INITIAL_STATE = {
	open: false,
	pathname: "/",
};

export const DrawerContext = createContext(INITIAL_STATE);

export const DrawerProvider = ({ children }) => {
	const [state, dispatch] = useReducer(DrawerReducer, INITIAL_STATE);

	const setDrawerState = (open) => {
		dispatch({
			type: "SET_DRAWER_STATE",
			payload: open,
		});
	};

	const setPathName = (pathname) => {
		dispatch({
			type: "SET_PATHNAME",
			payload: pathname,
		});
	};

	return (
		<DrawerContext.Provider
			value={{
				open: state.open,
				pathname: state.pathname,
				setDrawerState,
				setPathName,
			}}
		>
			{children}
		</DrawerContext.Provider>
	);
};
