import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

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
					<GitHubIcon sx={{ m: "5px" }} color="primary" />
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
					<Button size="medium">
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

				<Button variant="outlined" size="small" component={RouterLink} to="/">
					Welcome page
				</Button>
			</Toolbar>
		</React.Fragment>
	);
}

export default Header;
