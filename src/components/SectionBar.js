import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
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
		<React.Fragment>
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
		</React.Fragment>
	);
}

SectionBar.propTypes = {
	sections: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	title: PropTypes.string.isRequired,
};

export default SectionBar;
