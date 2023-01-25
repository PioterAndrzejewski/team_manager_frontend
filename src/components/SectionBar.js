import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
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
				{sections.map((section) => (
					<Link
						color="inherit"
						noWrap
						key={section.title}
						variant="body2"
						href={section.url}
						sx={{ p: 10, flexShrink: 0 }}
					>
						{section.title}
					</Link>
				))}
			</Toolbar>
		</nav>
	);
}

export default SectionBar;
