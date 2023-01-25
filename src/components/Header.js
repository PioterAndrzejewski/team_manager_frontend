import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Header(props) {
	const { title } = props;

	return (
		<React.Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Toolbar>
					<GitHubIcon sx={{ m: "5px" }} />
					<Button size="medium">
						<Link color="inherit" noWrap variant="body2" href="github.com">
							BE
						</Link>
					</Button>
					<Button size="medium">
						<Link color="inherit" noWrap variant="body2" href="github.com">
							FE
						</Link>
					</Button>
				</Toolbar>

				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					noWrap
					sx={{ flex: 1 }}
				>
					{title}
				</Typography>

				<Button variant="outlined" size="small">
					Change Project
				</Button>
			</Toolbar>
		</React.Fragment>
	);
}

export default Header;
