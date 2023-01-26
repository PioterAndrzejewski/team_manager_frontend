import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

function NewTaskCard(props) {
	return (
		<Grid item xs={12} md={6} sx={{ flexGrow: 1, m: 1 }}>
			<Card
				sx={{
					display: "flex",
					transition: "0.15s ease",
					"&:hover": {
						transform: "scale(104%)",
					},
				}}
			>
				<CardContent
					sx={{
						flex: 1,
						flexGrow: "grow",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Typography component="h2" variant="h5">
						Create new task
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default NewTaskCard;
