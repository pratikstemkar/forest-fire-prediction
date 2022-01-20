const appTheme = {
	palette: {
		common: {
			black: "#000000",
			white: "#FFFFFF",
		},
		primary: {
			main: "#2196F3",
			light: "#64B5F6",
			dark: "#1565C0",
			contrastText: "#fff",
		},
		secondary: {
			main: "#673AB7",
			light: "#9575CD",
			dark: "#4527A0",
			contrastText: "#fff",
		},
		warning: {
			main: "#FF9800",
			light: "#FFB74D",
			dark: "#D84315",
			contrastText: "#fff",
		},
		error: {
			main: "#F44336",
			light: "#E57373",
			dark: "#C62828",
			contrastText: "#fff",
		},
		success: {
			main: "#4CAF50",
			light: "#81C784",
			dark: "#2E7D32",
			contrastText: "#fff",
		},
		info: {
			main: "#03A9F4",
			light: "#4FC3F7",
			dark: "#0277BD",
			contrastText: "#fff",
		},
		light: {
			main: "#ffffff",
			light: "#4FC3F7",
			dark: "#000000",
			contrastText: "#dedede",
		},
		text: {
			primary: "rgba(0, 0, 0, 0.87)",
			secondary: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)",
		},
		divider: "rgba(0, 0, 0, 0.12)",
		background: {
			paper: "#FFFFFF",
			default: "#FFFFFF",
		},
	},
	typography: {
		fontFamily: ['"Outfit"', "sans-serif"].join(","),
		fontSize: 14,
		fontWeightThin: 100,
		fontWeightLight: 200,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
};

export default appTheme;
