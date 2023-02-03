import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import logo from "../images/logo.png";

function Header(props) {
	const { title } = props;

	return (
		<React.Fragment>
			<Toolbar
				sx={{
					borderBottom: 1,
					borderColor: "divider",
					justifyContent: "space-between",
				}}
			>
				<Toolbar>
					<Button variant="outlined" size="small" component={RouterLink} to="/">
						Welcome page
					</Button>
					<GitHubIcon sx={{ mr: "5px", ml: "35px" }} color="primary" />
					<Button size="medium">
						<Link
							noWrap
							variant="body2"
							href="https://github.com/PioterAndrzejewski/team_manager_backend"
							sx={{
								textDecoration: "none",
								color: "primary",
							}}
						>
							BE
						</Link>
					</Button>
					<Button size="sm" sx={{ padding: "5px" }}>
						<Link
							noWrap
							variant="body2"
							href="https://github.com/PioterAndrzejewski/team_manager_frontend"
							sx={{
								textDecoration: "none",
								color: "primary",
							}}
						>
							FE
						</Link>
					</Button>
				</Toolbar>

				<CardMedia
					component="img"
					sx={{ width: "200px" }}
					image={logo}
					alt="random"
				/>
			</Toolbar>
		</React.Fragment>
	);
}

export default Header;
