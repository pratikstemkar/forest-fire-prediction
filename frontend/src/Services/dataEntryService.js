import axios from "axios";
import {
	API_URL,
	DATA_COUNT,
	DATA_UPDATE_URL,
	DATA_URL,
	GSPEC_URL,
	GWILD_URL,
} from "../constants";

class dataEntryService {
	postData = (dataEntryObject) => {
		const config = {
			method: "post",
			url: `${API_URL}${DATA_UPDATE_URL}`,
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

	getRoData = (username) => {
		const config = {
			method: "get",
			url: `${API_URL}${DATA_URL}/ro/?username=${username}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	getDoData = (division) => {
		console.log(division);
		const config = {
			method: "get",
			url: `${API_URL}${DATA_URL}/do/?division=${division}`,
			headers: {
				"Content-Type": "application/json",
			},
		};

		return axios(config);
	};

	updateData = (dataEntryArray) => {
		const config = {
			method: "put",
			url: `${API_URL}${DATA_UPDATE_URL}`,
			headers: {
				"Content-Type": "application/json",
			},
			data: JSON.stringify(dataEntryArray),
		};
		return axios(config);
	};

	getSpeciesData = () => {
		const config = {
			method: "get",
			url: `${API_URL}${GSPEC_URL}`,
			headers: {},
		};

		return axios(config);
	};

	getWildlifeData = () => {
		var config = {
			method: "get",
			url: `${API_URL}${GWILD_URL}`,
			headers: {},
		};

		return axios(config);
	};

	getDataCount = () => {
		var config = {
			method: "get",
			url: `${API_URL}${DATA_COUNT}`,
			headers: {},
		};

		return axios(config);
	};
}

export default new dataEntryService();
