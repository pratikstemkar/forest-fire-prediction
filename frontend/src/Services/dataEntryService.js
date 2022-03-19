import axios from "axios";
import {
	API_URL,
	DATA_COUNT,
	DATA_UPDATE_URL,
	DATA_URL,
	GSSYS_URL,
	GNWCG_URL,
	GSSYST_URL,
	GFCAUSE_URL,
	GOWNER_URL,
	DATA_SAVE_URL,
} from "../constants";

class dataEntryService {
	postData = (dataEntryObject) => {
		const config = {
			method: "post",
			url: `${API_URL}${DATA_SAVE_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(dataEntryObject),
		};

		return axios(config);
	};

	getData = () => {
		const config = {
			method: "get",
			url: `${API_URL}${DATA_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};
		return axios(config);
	};

	updateData = (dataEntry) => {
		const config = {
			method: "put",
			url: `${API_URL}${DATA_UPDATE_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(dataEntry),
		};
		return axios(config);
	};

	getDataCount = () => {
		var config = {
			method: "get",
			url: `${API_URL}${DATA_COUNT}`,
			headers: { "Content-Type": "application/json" },
		};

		return axios(config);
	};

	getSourceSystemType = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GSSYST_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	getSourceSystem = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GSSYS_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	getNWCGReportingAgency = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GNWCG_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	getStatCauseCode = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GFCAUSE_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	getOwnerCode = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GOWNER_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};
}

export default new dataEntryService();
