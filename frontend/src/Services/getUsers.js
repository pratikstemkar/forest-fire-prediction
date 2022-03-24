import { API_URL, AU_URL } from "../constants";
import axios from "axios";

const getUsers = () => {
	axios
		.get(`${process.env.REACT_APP_API_URL}${AU_URL}`)
		.then(function (response) {
			if (response.status === 200) {
				return response.data;
			} else if (response.status === 403) {
				return [];
			} else {
				return [];
			}
		});
};

export default new getUsers();
