import React, { useContext } from "react";
import { NavLink as Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import StorageIcon from "@mui/icons-material/Storage";
import Menu from "@mui/icons-material/List";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DrawerContext } from "../../Contexts/DrawerContext";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down("md"));

	const { setDrawerState, pathname } = useContext(DrawerContext);
	const handleOpen = () => {
		setDrawerState(true);
	};

	React.useEffect(() => {
		console.log(window.location.pathname);
	}, [window.location.pathname]);

	let drawerLinks = [
		{
			name: "Developers",
			icon: <GroupIcon />,
			link: "/developers",
			role: [],
			auth: false,
		},
		{
			name: "Login",
			icon: <LoginIcon />,
			link: "/login",
			role: [],
			auth: false,
		},
	];

	if (user) {
		if (user.roles.includes("ROLE_RO")) {
			drawerLinks = [
				{
					name: "Data Entry",
					icon: <StorageIcon />,
					link: "/dataentry",
					role: ["RO"],
					auth: true,
				},
				{
					name: "Profile",
					icon: (
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
					),
					link: "/dashboard",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
				{
					name: "Logout",
					icon: <LogoutIcon />,
					link: "/logout",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
			];
		} else if (user.roles.includes("ROLE_USER")) {
			drawerLinks = [
				{
					name: "Prediction",
					icon: <OnlinePredictionIcon />,
					link: "/prediction",
					role: ["USER"],
					auth: true,
				},
				{
					name: "Profile",
					icon: (
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
					),
					link: "/dashboard",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
				{
					name: "Logout",
					icon: <LogoutIcon />,
					link: "/logout",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
			];
		} else if (user.roles.includes("ROLE_ADMIN")) {
			drawerLinks = [
				{
					name: "Admin",
					icon: <AdminPanelSettingsIcon />,
					link: "/admin",
					role: ["ROLE_ADMIN"],
					auth: true,
				},
				{
					name: "Profile",
					icon: (
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
					),
					link: "/dashboard",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
				{
					name: "Logout",
					icon: <LogoutIcon />,
					link: "/logout",
					role: ["ROLE_RO", "ROLE_USER", "ROLE_ADMIN"],
					auth: true,
				},
			];
		}
	}

	let matlinks = [
		<Link style={{ textDecoration: "none", color: "white" }} to="/developers">
			<Button color="inherit">
				<GroupIcon />
				&nbsp;Developers
			</Button>
		</Link>,
		<Link style={{ textDecoration: "none", color: "white" }} to="/login">
			<Button color="inherit">
				<LoginIcon />
				&nbsp;Login
			</Button>
		</Link>,
	];

	if (localStorage.getItem("user")) {
		if (JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_ADMIN")) {
			matlinks = [
				<Link style={{ textDecoration: "none", color: "white" }} to="/admin">
					<Button color="inherit">
						<AdminPanelSettingsIcon />
						&nbsp;admin
					</Button>
				</Link>,
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to="/dashboard"
				>
					<Button color="inherit">
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
						&nbsp;Profile
					</Button>
				</Link>,
				<Button onClick={logout} color="inherit">
					<LogoutIcon />
					&nbsp;Logout
				</Button>,
			];
		} else if (
			JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_RO")
		) {
			matlinks = [
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to={
						JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_RO")
							? "dataentry"
							: "prediction"
					}
				>
					<Button color="inherit">
						<StorageIcon />
						&nbsp;Data Entry
					</Button>
				</Link>,
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to="/dashboard"
				>
					<Button color="inherit">
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
						&nbsp;Profile
					</Button>
				</Link>,
				<Button onClick={logout} color="inherit">
					<LogoutIcon />
					&nbsp;Logout
				</Button>,
				<>
					{pathname === "/visualise" && (
						<IconButton onClick={handleOpen}>
							<Menu style={{ color: "white" }} />
						</IconButton>
					)}
				</>,
			];
		} else if (
			JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_USER")
		) {
			matlinks = [
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to={
						JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_RO")
							? "dataentry"
							: "prediction"
					}
				>
					<Button color="inherit">
						<OnlinePredictionIcon />
						&nbsp;Prediction
					</Button>
				</Link>,
				<Link
					style={{ textDecoration: "none", color: "white" }}
					to="/dashboard"
				>
					<Button color="inherit">
						<Avatar
							src={JSON.parse(localStorage.getItem("user")).pfp}
							sx={{ width: 25, height: 25 }}
						/>
						&nbsp;Profile
					</Button>
				</Link>,
				<Button onClick={logout} color="inherit">
					<LogoutIcon />
					&nbsp;Logout
				</Button>,
				<>
					{pathname === "/visualise" && (
						<IconButton onClick={handleOpen}>
							<Menu style={{ color: "white" }} />
						</IconButton>
					)}
				</>,
			];
		}
	}

	const [state, setState] = React.useState({
		open: false,
	});

	const toggleDrawer = (open) => (event) => {
		setState({ open: open });
	};

	return (
		<>
			<header>
				<Box sx={{ flexGrow: 1, width: "100%" }}>
					<AppBar position="static" color="primary">
						<Toolbar>
							{isMatch ? (
								<IconButton color="light" onClick={toggleDrawer(true)}>
									<MenuIcon />
								</IconButton>
							) : null}
							&nbsp;
							{isMatch ? (
								<>
									<img
										className="my-2"
										src="https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png"
										style={{ width: "8%", maxWidth: "8%" }}
										alt="app logo"
									/>
									<span className="text-light lead">
										<Link
											style={{ textDecoration: "none", color: "white" }}
											to="/"
										>
											&nbsp;<strong>Forest Fire Prediction</strong>
										</Link>
									</span>
								</>
							) : (
								<>
									<img
										className="my-2"
										src="https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png"
										style={{ width: "3%", maxWidth: "3%" }}
										alt="app logo"
									/>
									<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
										<Link
											style={{ textDecoration: "none", color: "white" }}
											to="/"
										>
											&nbsp;<strong>Forest Fire Prediction</strong>
										</Link>
									</Typography>
								</>
							)}
							{isMatch ? null : (
								<Stack direction="row" spacing={1}>
									{matlinks}
								</Stack>
							)}
						</Toolbar>
					</AppBar>
				</Box>
			</header>

			{/* ------------------------------------ DRAWER ---------------------------------------------------------------- */}

			<Drawer anchor="left" open={state.open} onClose={toggleDrawer(false)}>
				<Box
					sx={{
						width: "25vh",
						textAlign: "center",
						backgroundColor: theme.palette.primary.main,
						flexGrow: 1,
					}}
					role="presentation"
				>
					<List style={{ color: "white" }}>
						<ListItem onClick={toggleDrawer(false)}>
							<Link to="/" style={{ textDecoration: "none", color: "white" }}>
								<ListItemText primary="Forest Fire Prediction" />
							</Link>
						</ListItem>
					</List>
					<Divider style={{ color: "white" }} />
					<List style={{ color: "white" }}>
						{drawerLinks.map((dl) => (
							<ListItem button key={dl.name} onClick={toggleDrawer(false)}>
								<ListItemIcon sx={{ color: "white" }}>{dl.icon}</ListItemIcon>
								<Link
									to={dl.link}
									style={{ textDecoration: "none", color: "white" }}
								>
									<ListItemText primary={dl.name} />
								</Link>
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default Navbar;
