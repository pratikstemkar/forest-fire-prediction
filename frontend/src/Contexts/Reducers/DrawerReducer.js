const DrawerReducer = (state, action) => {
    switch (action.type) {
        case "SET_DRAWER_STATE":
            return {
                ...state,
                open: action.payload,
            };
        case "SET_PATHNAME":
            return {
                ...state,
                pathname: action.payload,
            };
        default:
            return state;
    }
};

export default DrawerReducer;
