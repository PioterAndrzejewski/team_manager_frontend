import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import Typography from "@mui/material/Typography";

function Header(props) {
	const { title } = props;

	return (
		<React.Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Button size="medium">
					<GitHubIcon sx={{ pr: 0.5 }} />
					GitHub
				</Button>

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
