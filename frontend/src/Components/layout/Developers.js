import React from "react";
import Avatar from "@mui/material/Avatar";
import Footer from "./Footer";

const Developers = () => {
	return (
		<>
			<div className="container mt-4">
				<h2>Developers</h2>
				<div className="row mt-2 mb-2 mx-2">
					<div className="col mb-2">
						<center>
							<div className="card">
								<div className="card-body">
									<div className="card-img-top">
										<Avatar
											alt="Remy Sharp"
											sx={{ height: 200, width: 200 }}
											src="https://i.pinimg.com/originals/77/23/d5/7723d5889e1dd0f2700245a0cf52069c.jpg"
										/>
									</div>
									<h5 className="card-title mt-2">
										<b>Pratik Temkar</b>
									</h5>
									<h6 class="card-subtitle mb-2 text-muted">
										<small>I just want a job</small>
									</h6>
									<p class="card-text">
										<small>
											If you don’t want to hire me but like what you see anyway
											– feel free to connect, I’m young free and single – YOLO.
										</small>
									</p>
								</div>
							</div>
						</center>
					</div>
					<div className="col mb-2">
						<center>
							<div className="card">
								<div className="card-body">
									<div className="card-img-top">
										<Avatar
											alt="Remy Sharp"
											sx={{ height: 200, width: 200 }}
											src="https://cdn.myanimelist.net/s/common/uploaded_files/1442429498-68747eb4ccb3577a96912baed4e16dac.jpeg"
										/>
									</div>
									<h5 className="card-title mt-2">
										<b>Prem Kulkarni</b>
									</h5>
									<h6 class="card-subtitle mb-2 text-muted">
										<small>I do what I like</small>
									</h6>
									<p class="card-text">
										<small>
											Men want to be me, women want to be with me and companies
											want to hire me. It’s as simple as that.
										</small>
									</p>
								</div>
							</div>
						</center>
					</div>
					<div className="col mb-2">
						<center>
							<div className="card">
								<div className="card-body">
									<div className="card-img-top">
										<Avatar
											alt="Remy Sharp"
											sx={{ height: 200, width: 200 }}
											src="https://cdn.myanimelist.net/s/common/uploaded_files/1442417844-8e9dfc12449d2bc26d8ca0cabf598afe.jpeg"
										/>
									</div>
									<h5 className="card-title mt-2">
										<b>Karan Wagh</b>
									</h5>
									<h6 class="card-subtitle mb-2 text-muted">
										<small>I know everything</small>
									</h6>
									<p class="card-text">
										<small>
											You remember the kid at school, who knew everyone, knew
											all the latest trends, and even knew how to talk to the
											girls? That’s me.
										</small>
									</p>
								</div>
							</div>
						</center>
					</div>
					<div className="col mb-2">
						<center>
							<div className="card">
								<div className="card-body">
									<div className="card-img-top">
										<Avatar
											alt="Remy Sharp"
											sx={{ height: 200, width: 200 }}
											src="https://cdn.myanimelist.net/s/common/uploaded_files/1442429646-ad921f883797f47ce86c420e475920f6.jpeg"
										/>
									</div>
									<h5 className="card-title mt-2">
										<b>Sakshi Chaudhari</b>
									</h5>
									<h6 class="card-subtitle mb-2 text-muted">
										<small>I bully words</small>
									</h6>
									<p class="card-text">
										<small>
											Ruthless in business – and proud of it. Don’t get in my
											way.
										</small>
									</p>
								</div>
							</div>
						</center>
					</div>
				</div>
			</div>
		</>
	);
};

export default Developers;
