import React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Footer = () => {
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<footer>
				<Box
					px={{ xs: 1, sm: 1 }}
					py={{ xs: 1, sm: 1 }}
					bgcolor="text.primary"
					color="white"
				>
					<Container maxWidth="lg">
						<Box textAlign="center" pt={{ xs: 1, sm: 1 }} pb={{ xs: 1, sm: 1 }}>
							{isMatch ? null : (
								<div className="mb-4">
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="space-evenly"
									>
										<a
											style={{ color: "white" }}
											href="https://www.fsi.nic.in/"
											target="_blank"
											rel="noreferrer"
										>
											Forest Survey of India
										</a>
										<a
											style={{ color: "white" }}
											href="https://www.mygov.in/"
											target="_blank"
											rel="noreferrer"
										>
											MyGov
										</a>
										<a
											style={{ color: "white" }}
											href="https://www.pmindia.gov.in/en/"
											target="_blank"
											rel="noreferrer"
										>
											PMINDIA
										</a>
										<a
											style={{ color: "white" }}
											href="https://www.meity.gov.in/"
											target="_blank"
											rel="noreferrer"
										>
											Ministry of Electronics and Information Technology
										</a>
										<a
											style={{ color: "white" }}
											href="https://web.umang.gov.in/landing/"
											target="_blank"
											rel="noreferrer"
										>
											UMANG
										</a>
										<a
											style={{ color: "white" }}
											href="http://117.239.115.41/smsalerts/index.php"
											target="_blank"
											rel="noreferrer"
										>
											Forest Fire Alert System 3.0
										</a>
									</Stack>
								</div>
							)}
							<div className="row">
								<div className="col">
									<small>
										Forest Fire Prediction &reg; {new Date().getFullYear()}
									</small>
								</div>
							</div>
						</Box>
					</Container>
				</Box>
			</footer>
		</>
	);
};

export default Footer;
