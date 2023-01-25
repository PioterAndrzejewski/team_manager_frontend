import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const sections = [
	{ title: "Home screen", url: "#" },
	{ title: "Manage Team", url: "#" },
	{ title: "Manage Tasks", url: "#" },
	{ title: "Project settings", url: "#" },
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
						href={section.url}
						sx={{ p: 10, flexShrink: 0 }}
					>
						{index === 0 ? "Project ID: 555" : section.title}
					</Link>
				))}
			</Toolbar>
		</nav>
	);
}

export default SectionBar;
