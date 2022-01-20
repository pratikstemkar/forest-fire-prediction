const AuthReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};

		case "LOAD_USER":
			let tempUser = JSON.parse(localStorage.getItem("user"));
			tempUser.username = action.payload.username;
			tempUser.division = action.payload.division;
			tempUser.roles = action.payload.roles;
			tempUser.pfp = action.payload.pfp;
			localStorage.setItem("user", JSON.stringify(tempUser));
			return {
				...state,
				user: tempUser,
				isAuthenticated: true,
				loading: false,
			};

		case "LOGIN_SUCCESS":
			localStorage.setItem("user", JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				loading: false,
			};

		case "AUTH_ERROR":
		case "LOGIN_FAIL":
		case "LOGOUT":
			localStorage.removeItem("user");
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loading: false,
			};

		case "SRANGE_SUCCESS":
		case "SSPEC_SUCCESS":
		case "SWILD_SUCCESS":
		case "SDIV_SUCCESS":
		case "SR_SUCCESS":
		case "SU_SUCCESS":
		case "CPFP_SUCCESS":
		case "CU_SUCCESS":
		case "CP_SUCCESS":
			return {
				...state,
				loading: false,
			};

		case "SWILD_FAIL":
		case "SSPEC_FAIL":
		case "SRANGE_FAIL":
		case "SDIV_FAIL":
		case "SR_FAIL":
		case "SU_FAIL":
		case "CPFP_FAIL":
		case "CU_FAIL":
		case "CP_FAIL":
			return {
				...state,
				loading: false,
			};

		case "DWILD_SUCCESS":
		case "DWILD_FAIL":
		case "DSPEC_SUCCESS":
		case "DSPEC_FAIL":
		case "DRANGE_SUCCESS":
		case "DRANGE_FAIL":
		case "DDIV_SUCCESS":
		case "DDIV_FAIL":
		case "DR_FAIL":
		case "DR_SUCCESS":
		case "DU_FAIL":
		case "DU_SUCCESS":
			return {
				...state,
				loading: false,
			};

		case "UWILD_SUCCESS":
		case "UWILD_FAIL":
		case "USPEC_SUCCESS":
		case "USPEC_FAIL":
		case "URANGE_SUCCESS":
		case "URANGE_FAIL":
		case "UDIV_SUCCESS":
		case "UDIV_FAIL":
		case "RU_FAIL":
		case "RU_SUCCESS":
		case "UU_FAIL":
		case "UU_SUCCESS":
			return {
				...state,
				loading: false,
			};

		default:
			return state;
	}
};

export default AuthReducer;
