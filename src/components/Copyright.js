import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props) {
	return (
		<footer>
			<Typography
				variant="body2"
				color="text.secondary"
				align="center"
				{...props}
			>
				{"Copyright © "}
				<Link color="inherit" href="https://mui.com/">
					Team Manager by Piotr Andrzejewski
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		</footer>
	);
}
