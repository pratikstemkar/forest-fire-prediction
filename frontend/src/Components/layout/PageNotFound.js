import React from "react";
import Footer from "./Footer";

const PageNotFound = () => {
	return (
		<>
			<div className="container">
				<div
					className="row mt-2 align-items-center"
					style={{ height: "calc(100vh - 20vh)" }}
				>
					<div className="col text-center">
						<img
							src="https://media.discordapp.net/attachments/909801322436505600/911663695468331028/3819740.jpg?width=994&height=663"
							width="70%"
							height="50%"
							alt="404 Page Not Found"
						/>
					</div>
				</div>
			</div>
			<div
				style={{
					position: "fixed",
					left: 0,
					bottom: 0,
					right: 0,
				}}
			>
				<Footer />
			</div>
		</>
	);
};

export default PageNotFound;
