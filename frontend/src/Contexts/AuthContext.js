import { createContext, useReducer, useContext } from "react";
import axios from "axios";

import {
	API_URL,
	AUTH_URL,
	CPFP_URL,
	CP_URL,
	CU_URL,
	DDIV_URL,
	DRANGE_URL,
	DR_URL,
	DSPEC_URL,
	DU_URL,
	DWILD_URL,
	LOGIN_URL,
	SDIV_URL,
	SRANGE_URL,
	SR_URL,
	SSPEC_URL,
	SU_URL,
	SWILD_URL,
	UDIV_URL,
	URANGE_URL,
	UR_URL,
	USPEC_URL,
	UU_URL,
	UWILD_URL,
} from "../constants";

import AuthReducer from "./Reducers/AuthReducer";
import { AlertContext } from "./AlertContext";

const intitialState = {
	user: null,
	isAuthenticated: false,
	loading: false,
};

export const AuthContext = createContext(intitialState);

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, intitialState);

	const { setAlert } = useContext(AlertContext);

	const setLoading = (loading) => {
		dispatch({
			type: "SET_LOADING",
			payload: loading,
		});
	};

	const loadUser = () => {
		if (localStorage.getItem("user")) {
			let token =
				"Bearer " + JSON.parse(localStorage.getItem("user")).access_token;

			axios
				.get(`${API_URL}${AUTH_URL}`, {
					headers: { Authorization: token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_USER",
							payload: response.data,
						});
						// setAlert("User Loaded Successfully!", "success");
					}
				})
				.catch(function (error) {
					if (error.response) {
						dispatch({
							type: "AUTH_ERROR",
						});
					}
				});
		} else {
			dispatch({
				type: "AUTH_ERROR",
			});
			setAlert("Access Token Invalid", "error");
		}
	};

	const login = (username, password) => {
		setLoading(true);

		const payload = {
			username: username,
			password: password,
		};

		axios
			.post(`${API_URL}${LOGIN_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: response.data,
					});
					setAlert("Login Successful", "success", 3000);
				}
			})
			.catch(function (error) {
				if (error.response) {
					dispatch({
						type: "LOGIN_FAIL",
						payload: "Authentication Failed.",
					});
					setAlert("Login Failed", "error");
				}
			});
	};

	const logout = () => {
		dispatch({
			type: "LOGOUT",
		});
		setAlert("You are Logged out!", "error", 3000);
	};

	const changepassword = (username, cPassword, nPassword) => {
		setLoading(true);
		const payload = {
			username: username,
			currentpassword: cPassword,
			newpassword: nPassword,
		};
		axios
			.put(`${API_URL}${CP_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "CP_SUCCESS",
					});
					setAlert("Password Change Successful!", "success");
				}
			})
			.catch(function (error) {
				console.log(error);
				dispatch({
					type: "CP_FAIL",
				});
				setAlert("Password Change Failed!", "error", 3000);
			});
	};

	const changeusername = (access_token, newusername) => {
		setLoading(true);
		const payload = {
			accesstoken: access_token,
			newusername: newusername,
		};
		axios
			.put(`${API_URL}${CU_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "CU_SUCCESS",
					});
					loadUser();
					setAlert("Username Change Successful!", "success");
				}
			})
			.catch(function (error) {
				console.log(error);
				dispatch({
					type: "CU_FAIL",
				});
				setAlert("Username Change Failed!", "error");
			});
	};

	const changepfp = (username, pfp) => {
		setLoading(true);
		const payload = {
			username: username,
			pfp: pfp,
		};
		axios
			.put(`${API_URL}${CPFP_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "CPFP_SUCCESS",
					});
					setAlert("Profile Picture Change Successful!", "success");
				}
			})
			.catch(function (error) {
				if (error.response) {
					console.log(error);
					dispatch({
						type: "CPFP_FAIL",
					});
					setAlert(
						error.response.data.message + " Check the URL provided!",
						"error",
						3000
					);
				}
			});
	};

	const adduser = (username, password, range, division, designation, pfp) => {
		setLoading(true);

		const payload = {
			username: username,
			password: password,
			range: range,
			division: division,
			designation: designation,
			pfp: pfp,
			roles: ["ROLE_" + designation],
		};

		axios
			.post(`${API_URL}${SU_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SU_SUCCESS",
					});
					setAlert(`User Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SU_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const deleteuser = (username) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DU_URL}${username}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DU_SUCCESS",
					});
					setAlert("User Deleted Successfully!", "success");
				}
			})
			.catch(function (error) {
				if (error.response) {
					dispatch({
						type: "DU_FAIL",
					});
					setAlert("User Delete Failed!", "error");
				}
			});
	};

	const updateuser = (username, range, division, designation, pfp) => {
		setLoading(true);

		const payload = {
			username: username,
			range: range,
			division: division,
			designation: designation,
			pfp: pfp,
			roles: ["ROLE_" + designation],
		};

		axios
			.put(`${API_URL}${UU_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UU_SUCCESS",
					});
					setAlert(`${username} updated successfully!`, "success");
				}
			})
			.catch(function (error) {
				if (error.response) {
					dispatch({
						type: "UU_FAIL",
					});
					setAlert("User Update Failed!", "error");
				}
			});
	};

	// ROLE
	const addrole = (name, description, img) => {
		setLoading(true);

		const payload = {
			name: name,
			description: description,
			img: img,
		};

		axios
			.post(`${API_URL}${SR_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SR_SUCCESS",
					});
					setAlert(`Role Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SR_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updaterole = (id, name, description, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			description: description,
			img: img,
		};

		axios
			.put(`${API_URL}${UR_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "RU_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "RU_FAIL",
				});
				setAlert(`Role Update Failed!\n${err.response.data.message}`, "error");
			});
	};

	const deleterole = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DR_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DU_SUCCESS",
					});
					setAlert("Role Deleted Successfully!", "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "DU_FAIL",
				});
				setAlert(`Role Delete Failed!\n${err.response.data.message}`, "error");
			});
	};

	// RANGE
	const addrange = (name, description, img) => {
		setLoading(true);

		const payload = {
			name: name,
			description: description,
			img: img,
		};

		axios
			.post(`${API_URL}${SRANGE_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SRANGE_SUCCESS",
					});
					setAlert(`Range Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SRANGE_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updaterange = (id, name, description, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			description: description,
			img: img,
		};

		axios
			.put(`${API_URL}${URANGE_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "URANGE_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "URANGE_FAIL",
				});
				setAlert(`Range Update Failed!\n${err.response.data.message}`, "error");
			});
	};

	const deleterange = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DRANGE_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DRANGE_SUCCESS",
					});
					setAlert("Range Deleted Successfully!", "success");
					// window.location.reload();
				}
			})
			.catch((err) => {
				dispatch({
					type: "DRANGE_FAIL",
				});
				setAlert(`Range Delete Failed!\n${err.response.data.message}`, "error");
			});
	};

	// DIVISION
	const adddivision = (name, description, img) => {
		setLoading(true);

		const payload = {
			name: name,
			description: description,
			img: img,
		};

		axios
			.post(`${API_URL}${SDIV_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SDIV_SUCCESS",
					});
					setAlert(`Division Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SDIV_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatedivision = (id, name, description, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			description: description,
			img: img,
		};

		axios
			.put(`${API_URL}${UDIV_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UDIV_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UDIV_FAIL",
				});
				setAlert(
					`Division Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletedivision = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DDIV_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DDIV_SUCCESS",
					});
					setAlert("Division Deleted Successfully!", "success");
					// window.location.reload();
				}
			})
			.catch((err) => {
				dispatch({
					type: "DDIV_FAIL",
				});
				setAlert(
					`Division Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	// SPECIES
	const addspecies = (name, alias, img) => {
		setLoading(true);

		const payload = {
			name: name,
			alias: alias,
			img: img,
		};

		axios
			.post(`${API_URL}${SSPEC_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SSPEC_SUCCESS",
					});
					setAlert(`Species Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SSPEC_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatespecies = (id, name, alias, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			alias: alias,
			img: img,
		};

		axios
			.put(`${API_URL}${USPEC_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "USPEC_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "USPEC_FAIL",
				});
				setAlert(
					`Species Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletespecies = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DSPEC_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DSPEC_SUCCESS",
					});
					setAlert("Species Deleted Successfully!", "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "DSPEC_FAIL",
				});
				setAlert(
					`Species Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	// WILDLIFE
	const addwildlife = (name, alias, img) => {
		setLoading(true);

		const payload = {
			name: name,
			alias: alias,
			img: img,
		};

		axios
			.post(`${API_URL}${SWILD_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SWILD_SUCCESS",
					});
					setAlert(`Wildlife Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SWILD_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatewildlife = (id, name, alias, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			alias: alias,
			img: img,
		};

		axios
			.put(`${API_URL}${UWILD_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UWILD_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UWILD_FAIL",
				});
				setAlert(
					`Wildlife Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletewildlife = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DWILD_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DWILD_SUCCESS",
					});
					setAlert("Wildlife Deleted Successfully!", "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "DWILD_FAIL",
				});
				setAlert(
					`Wildlife Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				setLoading,
				loadUser,
				login,
				logout,
				changepassword,
				changeusername,
				changepfp,
				adduser,
				deleteuser,
				updateuser,
				addrole,
				updaterole,
				deleterole,
				addrange,
				updaterange,
				deleterange,
				adddivision,
				updatedivision,
				deletedivision,
				addspecies,
				updatespecies,
				deletespecies,
				addwildlife,
				updatewildlife,
				deletewildlife,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
