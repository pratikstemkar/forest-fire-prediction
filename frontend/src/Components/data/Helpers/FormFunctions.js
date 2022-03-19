export const DataEntryFormValidation = (DataEntryObject) => {
	let errorObj = {
		latitude: {
			error: false,
			msg: "",
		},
		longitude: {
			error: false,
			msg: "",
		},
		source_system_type: {
			error: false,
			msg: "",
		},
		source_system: {
			error: false,
			msg: "",
		},
		nwcg_reporting_agency: {
			error: false,
			msg: "",
		},
		discovery_date: {
			error: false,
			msg: "",
		},
		discovery_time: {
			error: false,
			msg: "",
		},
		cont_date: {
			error: false,
			msg: "",
		},
		cont_time: {
			error: false,
			msg: "",
		},
		state: {
			error: false,
			msg: "",
		},
		stat_cause_code: {
			error: false,
			msg: "",
		},
		owner_code: {
			error: false,
			msg: "",
		},
	};
	let flag = false;

	Object.keys(DataEntryObject).forEach((label) => {
		if (label !== "cont_date" && label !== "cont_time") {
			if (DataEntryObject[label].length === 0) {
				errorObj[label].error = true;
				errorObj[label].msg = `${label} cannot be empty`;
				flag = true;
			}
		}
	});

	return [errorObj, flag];
};
