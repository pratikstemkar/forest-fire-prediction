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

		case "SFCAUSE_SUCCESS":
		case "SOWNER_SUCCESS":
		case "SSSYS_SUCCESS":
		case "SNWCG_SUCCESS":
		case "SFSIZE_SUCCESS":
		case "SR_SUCCESS":
		case "SU_SUCCESS":
		case "CPFP_SUCCESS":
		case "CU_SUCCESS":
		case "CP_SUCCESS":
			return {
				...state,
				loading: false,
			};

		case "SNWCG_FAIL":
		case "SSSYS_FAIL":
		case "SFCAUSE_FAIL":
		case "SOWNER_FAIL":
		case "SFSIZE_FAIL":
		case "SR_FAIL":
		case "SU_FAIL":
		case "CPFP_FAIL":
		case "CU_FAIL":
		case "CP_FAIL":
			return {
				...state,
				loading: false,
			};

		case "DNWCG_SUCCESS":
		case "DNWCG_FAIL":
		case "DSSYS_SUCCESS":
		case "DSSYS_FAIL":
		case "DFCAUSE_SUCCESS":
		case "DFCAUSE_FAIL":
		case "DOWNER_SUCCESS":
		case "DOWNER_FAIL":
		case "DFSIZE_SUCCESS":
		case "DFSIZE_FAIL":
		case "DR_FAIL":
		case "DR_SUCCESS":
		case "DU_FAIL":
		case "DU_SUCCESS":
			return {
				...state,
				loading: false,
			};

		case "UNWCG_SUCCESS":
		case "UNWCG_FAIL":
		case "USSYS_SUCCESS":
		case "USSYS_FAIL":
		case "UFCAUSE_SUCCESS":
		case "UFCAUSE_FAIL":
		case "UOWNER_SUCCESS":
		case "UOWNER_FAIL":
		case "UFSIZE_SUCCESS":
		case "UFSIZE_FAIL":
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
