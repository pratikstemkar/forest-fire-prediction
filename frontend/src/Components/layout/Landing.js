import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AuthContext } from "../../Contexts/AuthContext";
import dataEntryService from "../../Services/dataEntryService";
import { DrawerContext } from "../../Contexts/DrawerContext";

const Landing = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const { setPathName } = useContext(DrawerContext);

	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const [dataCount, setDataCount] = useState(0);

	useEffect(() => {
		dataEntryService.getDataCount().then((data) => {
			setDataCount(data.data);
		});
		console.log(dataCount);
		setPathName(window.location.pathname);
	}, []);

	return (
		<>
			<div
				style={{
					backgroundImage: `url("https://cdn.discordapp.com/attachments/879765305717588039/908640390800875520/Frame01.png")`,
					minHeight: "100%",
					minWidth: "100%",
					backgroundSize: "cover",
					backgroundPosition: "center",
					textAlign: "center",
					position: "fixed",
				}}
			>
				<section class="py-5 my-5 text-center container">
					<div className="row">
						<div className="col d-flex justify-content-center mb-2">
							<Card
								variant="outlined"
								style={{
									minWidth: "275px",
									maxWidth: "50%",
								}}
							>
								<React.Fragment>
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color="text.secondary"
											gutterBottom
										>
											Firepoint Data
										</Typography>
										<Typography variant="h5" component="div">
											{parseInt(dataCount) > 0 ? parseInt(dataCount) : 0}
										</Typography>
										<Typography sx={{ mb: 1.5 }} color="text.secondary">
											incidents
										</Typography>
										<Typography variant="body2">
											in the last 30 days
											<br />
											{"reported by our system."}
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small">Learn More</Button>
									</CardActions>
								</React.Fragment>
							</Card>
						</div>
						{isAuthenticated ? (
							<div className="col d-flex justify-content-center mb-2">
								<Box sx={{ minWidth: 275, maxWidth: "50%" }}>
									<Card variant="outlined">
										<React.Fragment>
											<CardContent>
												<Typography
													sx={{ fontSize: 14 }}
													color="text.secondary"
													gutterBottom
												>
													Nearby
												</Typography>
												<Typography variant="h5" component="div">
													Forest Fire?
												</Typography>
												<Typography sx={{ mb: 1.5 }} color="text.secondary">
													Report incident
												</Typography>
												<Typography variant="body2">
													using our system.
													<br />
													&nbsp;
												</Typography>
											</CardContent>
											<CardActions>
												<Link to="/login" style={{ textDecoration: "none" }}>
													<Button size="small">Report Incident</Button>
												</Link>
											</CardActions>
										</React.Fragment>
									</Card>
								</Box>
							</div>
						) : null}
					</div>
				</section>
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

export default Landing;
