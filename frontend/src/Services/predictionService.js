import axios from "axios";
import { PAPI_URL } from "../constants";

class predictionService {
	postData = (predictionObject) => {
		const config = {
			method: "post",
			url: `${process.env.REACT_APP_PREDICT_URL}${PAPI_URL}`,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://127.0.0.1/api",
			},
			data: JSON.stringify(predictionObject),
		};

		return axios(config);
	};
}

export default new predictionService();
