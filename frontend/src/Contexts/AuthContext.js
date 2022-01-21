import { createContext, useReducer, useContext } from "react";
import axios from "axios";

import {
	API_URL,
	AUTH_URL,
	CPFP_URL,
	CP_URL,
	CU_URL,
	DFCAUSE_URL,
	DOWNER_URL,
	DFSIZE_URL,
	DR_URL,
	DSSYS_URL,
	DU_URL,
	DNWCG_URL,
	LOGIN_URL,
	SFCAUSE_URL,
	SOWNER_URL,
	SFSIZE_URL,
	SR_URL,
	SSSYS_URL,
	SU_URL,
	SNWCG_URL,
	UFCAUSE_URL,
	UOWNER_URL,
	UFSIZE_URL,
	UR_URL,
	USSYS_URL,
	UU_URL,
	UNWCG_URL,
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

	const adduser = (username, password, designation, pfp) => {
		setLoading(true);

		const payload = {
			username: username,
			password: password,
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

	const updateuser = (username, designation, pfp) => {
		setLoading(true);

		const payload = {
			username: username,
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

	// FIRE CAUSE
	const addfirecause = (name, img) => {
		setLoading(true);

		const payload = {
			name: name,
			img: img,
		};

		axios
			.post(`${API_URL}${SFCAUSE_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SFCAUSE_SUCCESS",
					});
					setAlert(`Fire Cause Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SFCAUSE_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatefirecause = (id, name, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			img: img,
		};

		axios
			.put(`${API_URL}${UFCAUSE_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UFCAUSE_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UFCAUSE_FAIL",
				});
				setAlert(
					`Fire Cause Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletefirecause = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DFCAUSE_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DFCAUSE_SUCCESS",
					});
					setAlert("Fire Cause Deleted Successfully!", "success");
					// window.location.reload();
				}
			})
			.catch((err) => {
				dispatch({
					type: "DFCAUSE_FAIL",
				});
				setAlert(
					`Fire Cause Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	// OWNER
	const addowner = (name, img) => {
		setLoading(true);

		const payload = {
			name: name,
			img: img,
		};

		axios
			.post(`${API_URL}${SOWNER_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SOWNER_SUCCESS",
					});
					setAlert(`Owner Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SOWNER_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updateowner = (id, name, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			img: img,
		};

		axios
			.put(`${API_URL}${UOWNER_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UOWNER_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UOWNER_FAIL",
				});
				setAlert(`Owner Update Failed!\n${err.response.data.message}`, "error");
			});
	};

	const deleteowner = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DOWNER_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DOWNER_SUCCESS",
					});
					setAlert("Owner Deleted Successfully!", "success");
					// window.location.reload();
				}
			})
			.catch((err) => {
				dispatch({
					type: "DOWNER_FAIL",
				});
				setAlert(`Owner Delete Failed!\n${err.response.data.message}`, "error");
			});
	};

	// FIRE SIZE
	const addfiresize = (grade, size, img) => {
		setLoading(true);

		const payload = {
			grade: grade,
			size: size,
			img: img,
		};

		axios
			.post(`${API_URL}${SFSIZE_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SFSIZE_SUCCESS",
					});
					setAlert(`FireSize Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SFSIZE_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatefiresize = (id, grade, size, img) => {
		setLoading(true);

		const payload = {
			id: id,
			grade: grade,
			size: size,
			img: img,
		};

		axios
			.put(`${API_URL}${UFSIZE_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UFSIZE_SUCCESS",
					});
					setAlert(`${grade} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UFSIZE_FAIL",
				});
				setAlert(
					`FireSize Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletefiresize = (grade) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DFSIZE_URL}${grade}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DFSIZE_SUCCESS",
					});
					setAlert("FireSize Deleted Successfully!", "success");
					// window.location.reload();
				}
			})
			.catch((err) => {
				dispatch({
					type: "DFSIZE_FAIL",
				});
				setAlert(
					`FireSize Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	// SOUREC SYSTEM
	const addsourcesystem = (name, type, img) => {
		setLoading(true);

		const payload = {
			name: name,
			type: type,
			img: img,
		};

		axios
			.post(`${API_URL}${SSSYS_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SSSYS_SUCCESS",
					});
					setAlert(`Source System Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SSSYS_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatesourcesystem = (id, name, type, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			type: type,
			img: img,
		};

		axios
			.put(`${API_URL}${USSYS_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "USSYS_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "USSYS_FAIL",
				});
				setAlert(
					`Source System Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletesourcesystem = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DSSYS_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DSSYS_SUCCESS",
					});
					setAlert("Source System Deleted Successfully!", "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "DSSYS_FAIL",
				});
				setAlert(
					`Source System Delete Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	// NWCG Reporting
	const addnwcgreporting = (name, agency, img) => {
		setLoading(true);

		const payload = {
			name: name,
			agency: agency,
			img: img,
		};

		axios
			.post(`${API_URL}${SNWCG_URL}`, payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SNWCG_SUCCESS",
					});
					setAlert(`NWCG Reporting Added Successfully!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SNWCG_FAIL",
					});
					setAlert(err.response.data.message, "error");
				}
			});
	};

	const updatenwcgreporting = (id, name, agency, img) => {
		setLoading(true);

		const payload = {
			id: id,
			name: name,
			agency: agency,
			img: img,
		};

		axios
			.put(`${API_URL}${UNWCG_URL}`, payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "UNWCG_SUCCESS",
					});
					setAlert(`${name} updated successfully!`, "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "UNWCG_FAIL",
				});
				setAlert(
					`NWCG Reporting Update Failed!\n${err.response.data.message}`,
					"error"
				);
			});
	};

	const deletenwcgreporting = (name) => {
		setLoading(true);

		axios
			.delete(`${API_URL}${DNWCG_URL}${name}`)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "DNWCG_SUCCESS",
					});
					setAlert("NWCG Reporting Deleted Successfully!", "success");
				}
			})
			.catch((err) => {
				dispatch({
					type: "DNWCG_FAIL",
				});
				setAlert(
					`NWCG Reporting Delete Failed!\n${err.response.data.message}`,
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
				addfirecause,
				updatefirecause,
				deletefirecause,
				addowner,
				updateowner,
				deleteowner,
				addfiresize,
				updatefiresize,
				deletefiresize,
				addsourcesystem,
				updatesourcesystem,
				deletesourcesystem,
				addnwcgreporting,
				updatenwcgreporting,
				deletenwcgreporting,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
