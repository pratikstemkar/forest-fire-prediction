import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
	let isAdmin = false;
	if (localStorage.getItem("user")) {
		isAdmin = JSON.parse(localStorage.getItem("user")).roles.includes(
			"ROLE_ADMIN"
		)
			? true
			: false;
	}

	return isAdmin ? children : <Navigate to="/login" />;
}

export default AdminRoute;
