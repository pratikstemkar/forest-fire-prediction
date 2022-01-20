import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const Logout = () => {
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		logout();
	}, []);

	return (
		<>
			<div className="container text-center">Logout</div>
		</>
	);
};

export default Logout;
