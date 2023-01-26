import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";

import { Link as RouterLink } from "react-router-dom";

const sections = [
	{ title: "Home screen", url: "/manager" },
	{ title: "Manage Team", url: "/manager/team" },
	{ title: "Manage Tasks", url: "/manager/tasks" },
	{ title: "Project settings", url: "/manager/settings" },
];

function SectionBar() {
	return (
		<nav>
			<Toolbar
				component="nav"
				variant="dense"
				sx={{ justifyContent: "center", overflowX: "auto" }}
			>
				{sections.map((section, index) => (
					<Link
						color="inherit"
						noWrap
						key={section.title}
						variant="body2"
						sx={{ p: 10, flexShrink: 0 }}
						component={RouterLink}
						to={section.url}
					>
						{index === 0 ? "Project ID: 555" : section.title}
					</Link>
				))}
			</Toolbar>
		</nav>
	);
}

export default SectionBar;
