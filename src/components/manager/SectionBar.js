import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import { Link as RouterLink } from "react-router-dom";
import { useTeam } from "../../context/teamContext";
import { Block } from "@mui/icons-material";

const sections = [
	{ title: "Home screen", url: "/manager/" },
	{ title: "Manage Team", url: "/manager/team" },
	{ title: "Manage Tasks", url: "/manager/tasks" },
	{ title: "Project settings", url: "/manager/settings" },
];

function SectionBar() {
	const { projectId, projectName } = useTeam();
	return (
		<nav>
			<Typography
				component="h1"
				variant="h3"
				align="center"
				color="text.primary"
				gutterBottom
			>
				{projectName}
			</Typography>
			<Toolbar
				component="nav"
				variant="dense"
				sx={{ justifyContent: "center", flexWrap: "wrap" }}
			>
				{sections.map((section, index) => (
					<Link
						color="inherit"
						noWrap
						key={section.title}
						variant="body2"
						sx={{
							marginLeft: 5,
							marginRight: 5,
							marginTop: 2,
							marginBottom: 2,
							paddingLeft: 2,
							paddingRight: 2,
							paddingTop: 1,
							paddingBottom: 1,
							flexShrink: 0,
							textDecoration: "none",
							transition: "0.15s",
							borderRadius: "5px",
							fontWeight: "600",
							backgroundColor: "white",
							boxShadow: "grey 1px 1px 3px",
							"&:hover": {
								transform: "scale(105%)",
								backgroundColor: "#f0fafc",
							},
						}}
						component={RouterLink}
						to={section.url}
					>
						{index === 0 ? `Project ID: ${projectId}` : section.title}
					</Link>
				))}
			</Toolbar>
		</nav>
	);
}

export default SectionBar;
